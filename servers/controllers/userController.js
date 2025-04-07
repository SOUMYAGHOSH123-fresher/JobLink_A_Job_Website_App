import User from './../models/User.js';
import JobApplication from './../models/JobApplication.js';
import { v2 as cloudinary } from 'cloudinary';


// Get the user Data
export const getUserData = async(req, res) => {
    const userId = req.auth.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.json({ success: false, message: 'User NoT Found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Apply for Job
export const applyForJob = async (req, res) => {
    const { jobId } = req.body;
    const userId = req.auth.userId;
    try {
        const isAlreadyApplied = await JobApplication.find(jobId, userId);
        if (isAlreadyApplied.length > 0) { 
            return res.json({ success: false, message: 'Already Applied!' });
        }
        const jobData = await Job.findById(jobId);
        if (!jobData) {
            res.json({ success: false, message: 'Job Not Found' });
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            data:Date.now()
        })
        res.json({ successtrue, message: 'Applied Successfully' });

    } catch (error) {
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
            res.json({ success: false, message: "No Job application Found" });
        }
        res.json({ success: true, applications });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//  Update user Profile (resume) 
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const resumeFile = req.resumeFile;
        const userDate = await User.findById(userId);

        if (resumeFile) {
            const uploadResume = await cloudinary.uploader.upload(resumeFile.path);
            userDate.resume = uploadResume.secure_url
        }

        await userDate.save();
        res.json({ success: true, message: "Resume Updated Successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }    
}

