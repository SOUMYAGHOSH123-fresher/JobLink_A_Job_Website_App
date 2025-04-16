import express from 'express';
import { protectCompany } from '../middleware/authMiddleware.js';
import {
  getSubscriptionPlans,
  subscribeToPlan,
  getSubscriptionStatus,
  cancelSubscription
} from '../controllers/subscriptionController.js';
import { getCompanyPostedJobs } from '../controllers/companyController.js';

const router = express.Router();

// Get all subscription plans (public route)
router.get('/plans', getSubscriptionPlans);

// Protected routes - require authentication
router.post('/subscribe', protectCompany, subscribeToPlan);
router.get('/status', protectCompany, getSubscriptionStatus);
router.post('/cancel', protectCompany, cancelSubscription);

// Get company's posted jobs
router.get('/company/jobs', protectCompany, getCompanyPostedJobs);

export default router; 