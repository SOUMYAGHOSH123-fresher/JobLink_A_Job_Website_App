import express from 'express';
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../controllers/userController.js';
import upload from './../config/multer.js';
import { clerkMiddleware } from '@clerk/express';

const router = express.Router();

// Apply Clerk middleware to all user routes with debug mode
router.use(clerkMiddleware({
  debug: true
}));

// get user data
router.get('/user', getUserData);

// Apply for a job
router.post('/apply', applyForJob);

// Get applied jobs data
router.get('/applications', getUserJobApplication);

// update user profile(resume)
router.post("/update-resume", upload.single('resume'), updateUserResume);

export default router;