import express from 'express';
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../controllers/userController.js';
import upload from './../config/multer.js';

const router = express.Router();

// get user data
router.get('/user', getUserData);

// Apply for a job
router.post('/apply', applyForJob);

// Get applied jobs data
router.get('/application', getUserJobApplication);

// update user prifile(resume)
router.post("/update-resume", upload.single('resume'), updateUserResume);

export default router;