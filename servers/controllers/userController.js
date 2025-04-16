import User from './../models/User.js';
import JobApplication from './../models/JobApplication.js';
import Job from './../models/Job.js';
import { v2 as cloudinary } from 'cloudinary';


// Get the user Data
export const getUserData = async (req, res) => {
    try {
        // Check if auth object exists
        if (!req.auth) {
            console.error('No auth object found in request');
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }

        // Log the auth object structure for debugging
        console.log('Auth object keys:', Object.keys(req.auth));
        
        // Get the user ID from the auth object
        // Clerk might store the user ID in different properties
        const userId = req.auth.userId || req.auth.id || req.auth.sub;
        
        if (!userId) {
            console.error('No userId found in auth object');
            return res.status(401).json({ success: false, message: 'User ID not found' });
        }

        console.log('Looking up user with ID:', userId);

        // Try to find the user in the database
        const user = await User.findById(userId);
        
        if (!user) {
            console.log('User not found in database, attempting to create');
            
            // Try to create the user if they don't exist
            try {
                // Extract user data from auth object with safer fallbacks
                const userData = {
                    _id: userId,
                    name: req.auth.firstName || 'User',
                    email: req.auth.emailAddresses?.[0]?.emailAddress || `${userId}@example.com`,
                    image: req.auth.imageUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                };
                
                // Create the user
                const newUser = await User.create(userData);
                console.log('Created new user:', newUser._id);
                
                return res.json({ success: true, user: newUser });
            } catch (createError) {
                console.error('Error creating user:', createError);
                return res.status(500).json({ 
                    success: false, 
                    message: 'Error creating user: ' + createError.message 
                });
            }
        }

        // Return the user data
        return res.json({ success: true, user });
    } catch (error) {
        console.error('Error in getUserData:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error: ' + error.message
        });
    }
}

// Apply for Job
export const applyForJob = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.auth.userId;
    
    console.log('=== Apply for Job ===');
    console.log('Request body:', req.body);
    console.log('User ID:', userId);
    console.log('Job ID:', jobId);
    
    try {
        // Check if job exists
        console.log('Searching for job with ID:', jobId);
        const jobData = await Job.findById(jobId);
        console.log('Job data found:', jobData);
        
        if (!jobId || !jobData) {
            console.log('Job not found. Job ID:', jobId);
            return res.json({ success: false, message: 'Job Not Found' });
        }
        
        // Check if already applied
        console.log('Checking if user already applied...');
        const isAlreadyApplied = await JobApplication.find({ jobId, userId });
        console.log('Existing applications:', isAlreadyApplied);
        
        if (isAlreadyApplied.length > 0) { 
            console.log('User already applied for this job');
            return res.json({ success: false, message: 'Already Applied!' });
        }

        // Create application
        console.log('Creating new application...');
        const application = await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        });
        
        console.log('Application created successfully:', application);
        res.json({ success: true, message: 'Applied Successfully' });
        
    } catch (error) {
        console.error('Error applying for job:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.json({ success: false, message: error.message });
    }
}


// Get user applied Application
export const getUserJobApplication = async (req, res) => {
    try {        
        const userId = req.auth.userId;
        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()
        
        if (!applications) {
            return res.json({ success: false, message: "No Job application Found" });
        }
        return res.json({ success: true, applications });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//  Update user Profile (resume) 
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const resumeFile = req.file;
        const userDate = await User.findById(userId);

        if (resumeFile) {
            const uploadResume = await cloudinary.uploader.upload(resumeFile.path);
            userDate.resume = uploadResume.secure_url
        }

        await userDate.save();
        return res.json({ success: true, message: "Resume Updated Successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }    
}

