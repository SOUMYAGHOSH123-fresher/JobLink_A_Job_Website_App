import express from 'express';
// import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany, getCompanyProfile, updateCompanyProfile, upgradePlan, getPlanStatus } from '../controllers/companyController.js';
import { 
    registerCompany, 
    loginCompany, 
    postJob, 
    // updateCompanyProfile,

    // getCompanyJobs,
    // updateJob,
    // deleteJob,
    // updatePlan,

    changeVisibility,
    getCompanyProfile,
    getCompanyData,
    getCompanyJobApplicants,
    getCompanyPostedJobs,
    changeJobApplicationStatus,
    upgradePlan,
    getPlanStatus
} from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', upload.single('image'), registerCompany);
router.post('/login', loginCompany);

// Protected routes
router.use(protectCompany);
router.post('/jobs', postJob);
// router.get('/jobs', getCompanyJobs);
// router.put('/jobs/:id', updateJob);
// router.delete('/jobs/:id', deleteJob);
router.put('/jobs/:id/visibility', changeVisibility);
// router.put('/plan', updatePlan);
router.get('/profile', getCompanyProfile);

// Get company Data
router.get('/company', getCompanyData);

// Get applicants data of Company
router.get('/applicants', getCompanyJobApplicants);

// Get Company Job list
router.get('/job-list', getCompanyPostedJobs);

// Change Application Status
// router.post('/change-status', changeJobApplicationStatus);

router.post('/change-status', protectCompany, changeJobApplicationStatus)

// Change Applicaton Visibility
router.post('/change-visibility', protectCompany, changeVisibility)


// Plan management routes
router.post('/upgrade-plan', upgradePlan);
router.get('/plan-status', getPlanStatus);

export default router;