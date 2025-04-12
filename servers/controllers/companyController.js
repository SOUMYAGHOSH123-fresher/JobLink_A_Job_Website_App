import Company from "../models/Company.js";
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from '../models/Job.js';
import JobApplication from './../models/JobApplication.js';

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
            image: imageUpload.secure_url
        })

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
    const { title, description, location, salary, level, category } = req.body;

    const companyId = req.company._id;

    console.log(companyId, { title, description, location, salary, level, category });

    try {
        const newJob = new Job({
            title, description, location, salary, level, category, companyId,
            date:Date.now(), 
        })
        await newJob.save()
        res.json({ success: true, newJob });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}

// Get Company Job Applicants
export const getCompanyJobApplicants = async (req, res) => {}

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
export const changeJobApplicationStatus = async (req, res) => { }

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

