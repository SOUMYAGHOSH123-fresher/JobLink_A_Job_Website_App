import express from 'express';
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router();


// Register a company
router.post('/register', upload.single('image'), registerCompany)

// Login a company
router.post('/login', loginCompany)

// Get company Data
router.get('/company', protectCompany, getCompanyData)

// Post a job
router.post('/post-job', protectCompany, postJob)

// Get applicants data of Company
router.get('/applicants', protectCompany, getCompanyJobApplicants)


// Get Company Job list
router.get('/job-list', protectCompany, getCompanyPostedJobs)

// Change Application Status
router.post('/change-status', protectCompany, changeJobApplicationStatus)

// Change Applicaton Visibility
router.post('/change-visibility', protectCompany, changeVisibility)


export default router;