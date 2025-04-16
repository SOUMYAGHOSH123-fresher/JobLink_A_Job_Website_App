import Company from "../models/Company.js";
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from '../models/Job.js';
import JobApplication from './../models/JobApplication.js';
import jwt from 'jsonwebtoken';

// Plan limits configuration
const PLAN_LIMITS = {
    free: {
        jobPostings: 1,
        validityDays: 30
    },
    starter: {
        jobPostings: 5,
        validityDays: 30
    },
    professional: {
        jobPostings: 15,
        validityDays: 30
    },
    enterprise: {
        jobPostings: 50,
        validityDays: 30
    }
};

// Register Company
export const registerCompany = async (req, res) => { 
    const { name, email, password } = req.body
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) { 
        return res.json({success:false, messsage:'Missing Details'})
    }

    try {
        const companyExist = await Company.findOne({ email });

        if (companyExist) {
            return res.json({success:false, message:"Company Already Registered"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url,
            plan: 'free',
            jobPostingLimit: PLAN_LIMITS.free.jobPostings,
            planStartDate: new Date(),
            planEndDate: new Date(Date.now() + PLAN_LIMITS.free.validityDays * 24 * 60 * 60 * 1000)
        })

        // Create token
        const token = jwt.sign(
            { id: company._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image,
                plan: company.plan,
                jobPostingLimit: company.jobPostingLimit,
                usedJobPostings: company.usedJobPostings
            },
            token
        })


    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

// Company Login
export const loginCompany = async (req, res) => { 
    const { email, password } = req.body;
    try {
        const company = await Company.findOne({ email });

        // change this to check if the company is registered
        if (!company) {
            return res.json({ success: false, message: "Invalid Email or Password" });
        }
        
        if (await bcrypt.compare(password, company.password)) {
            res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        } else {
            res.json({ success: false, message: "Invalis Email or Password" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get Company Data
export const getCompanyData = async (req, res) => { 
    try {
        const company = req.company;
        res.json({ success: true, company });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Post a new Job
export const postJob = async (req, res) => {
    try {
        const companyId = req.company._id;
        const {
            title,
            description,
            location,
            category,
            level,
            salary,
            requirements
        } = req.body;

        // Get company to check plan limits
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Check if plan is expired
        if (new Date() > company.planEndDate) {
            return res.status(403).json({ 
                message: 'Your plan has expired. Please upgrade to continue posting jobs.' 
            });
        }

        // Check if job posting limit is reached
        if (company.usedJobPostings >= company.jobPostingLimit) {
            return res.status(403).json({ 
                message: 'You have reached your job posting limit. Please upgrade your plan to post more jobs.' 
            });
        }

        // Create new job
        const newJob = new Job({
            title,
            description,
            location,
            category,
            level,
            salary,
            requirements,
            companyId,
            date: new Date(),
            visible: true
        });

        await newJob.save();

        // Increment used job postings count
        company.usedJobPostings += 1;
        await company.save();

        res.status(201).json({
            message: 'Job posted successfully',
            job: newJob
        });
    } catch (error) {
        console.error('Error posting job:', error);
        res.status(500).json({ message: 'Error posting job' });
    }
};

// Get Company Job Applicants
export const getCompanyJobApplicants = async (req, res) => {
    try {
        const companyId = req.company._id;

        // find job applications for the user and populate relation
        const applications = await JobApplication.find({ companyId })
            .populate('userId', 'name image resume')
            .populate('jobId', 'title location category level salary')
            .exec()
        
        return res.json({ success: true, applications });
    } catch (error) {
        res.json({ success: false, message: error.message });
    };
}

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
    try {
        const companyId = req.company._id;
        const jobs = await Job.find({ companyId });

        // Adding no of applicants into the data
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({ jobId: job._id });
            return { ...job.toObject(), applicants: applicants.length }
        }))

        res.json({ success: true, jobsData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// change Job Application Status
export const changeJobApplicationStatus = async (req, res) => { 
    try {
        const { id, status } = req.body;

        // Find Job applicants and update status
        await JobApplication.findOneAndUpdate({ _id: id }, { status });

        res.json({ success: true, message: 'Status Changed' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Change Job Visibility
export const changeVisibility = async (req, res) => { 
    try {
        const { id } = req.body;
        const companyId = req.company._id;
        
        if (!id) {
            return res.json({ success: false, message: "Job ID is required" });
        }

        const job = await Job.findById(id);
        if (!job) {
            return res.json({ success: false, message: "Job not found" });
        }

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible;
            await job.save();
            return res.json({ success: true, job });
        } else {
            return res.json({ success: false, message: "Unauthorized to change this job's visibility" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Plan management functions
export const upgradePlan = async (req, res) => {
    try {
        const { plan } = req.body;
        const companyId = req.company._id;

        // Validate plan type
        const validPlans = ['free', 'starter', 'professional', 'enterprise'];
        if (!validPlans.includes(plan)) {
            return res.status(400).json({ message: 'Invalid plan type' });
        }

        // Get company
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Set plan limits based on plan type
        let jobPostingLimit;
        switch (plan) {
            case 'free':
                jobPostingLimit = 3;
                break;
            case 'starter':
                jobPostingLimit = 10;
                break;
            case 'professional':
                jobPostingLimit = 50;
                break;
            case 'enterprise':
                jobPostingLimit = 200;
                break;
        }

        // Update company plan
        company.plan = plan;
        company.planStartDate = new Date();
        company.planEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
        company.jobPostingLimit = jobPostingLimit;

        await company.save();

        res.status(200).json({
            message: 'Plan upgraded successfully',
            plan: company.plan,
            jobPostingLimit: company.jobPostingLimit,
            planEndDate: company.planEndDate
        });
    } catch (error) {
        console.error('Error upgrading plan:', error);
        res.status(500).json({ message: 'Error upgrading plan' });
    }
};

export const getPlanStatus = async (req, res) => {
    try {
        const companyId = req.company._id;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json({
            plan: company.plan,
            jobPostingLimit: company.jobPostingLimit,
            usedJobPostings: company.usedJobPostings,
            planStartDate: company.planStartDate,
            planEndDate: company.planEndDate
        });
    } catch (error) {
        console.error('Error getting plan status:', error);
        res.status(500).json({ message: 'Error getting plan status' });
    }
};

// Update company plan
export const updatePlan = async (req, res) => {
    try {
        const { plan } = req.body;
        const companyId = req.company.id;

        if (!PLAN_LIMITS[plan]) {
            return res.status(400).json({ message: 'Invalid plan selected' });
        }

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Update plan details
        company.plan = plan;
        company.jobPostingLimit = PLAN_LIMITS[plan].jobPostings;
        company.planStartDate = new Date();
        company.planEndDate = new Date(Date.now() + PLAN_LIMITS[plan].validityDays * 24 * 60 * 60 * 1000);

        await company.save();

        res.json({
            message: 'Plan updated successfully',
            company: {
                id: company._id,
                name: company.name,
                plan: company.plan,
                jobPostingLimit: company.jobPostingLimit,
                usedJobPostings: company.usedJobPostings,
                planEndDate: company.planEndDate
            }
        });
    } catch (error) {
        console.error('Plan update error:', error);
        res.status(500).json({ message: 'Error updating plan' });
    }
};

// Get company profile
export const getCompanyProfile = async (req, res) => {
    try {
        const companyId = req.company.id;
        const company = await Company.findById(companyId).select('-password');
        
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.json({
            company,
            planDetails: {
                currentPlan: company.plan,
                jobPostingLimit: company.jobPostingLimit,
                usedJobPostings: company.usedJobPostings,
                remainingJobPostings: company.jobPostingLimit - company.usedJobPostings,
                planEndDate: company.planEndDate
            }
        });
    } catch (error) {
        console.error('Get company profile error:', error);
        res.status(500).json({ message: 'Error fetching company profile' });
    }
};

