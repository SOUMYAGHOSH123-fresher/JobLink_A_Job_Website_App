import Subscription from '../models/Subscription.js';
import Company from '../models/Company.js';
import { PLANS, PLAN_LIMITS, PLAN_PRICES } from '../config/plans.js';

// Get all subscription plans
export const getSubscriptionPlans = async (req, res) => {
    try {
        const plans = Object.entries(PLANS).map(([key, value]) => ({
            id: value,
            name: key.charAt(0) + key.slice(1).toLowerCase(),
            price: PLAN_PRICES[value],
            features: PLAN_LIMITS[value].features || [],
            jobPostingLimit: PLAN_LIMITS[value].jobPostingLimit,
            duration: PLAN_LIMITS[value].duration
        }));

        res.json(plans);
    } catch (error) {
        // console.error('Error getting subscription plans:', error);
        res.status(500).json({ message: 'Error getting subscription plans' });
    }
};

// Subscribe to a plan
export const subscribeToPlan = async (req, res) => {
    try {
        const { planId } = req.body;
        const companyId = req.company._id;

        if (!companyId) {
            return res.status(400).json({ message: 'Company ID is required' });
        }

        if (!Object.values(PLANS).includes(planId)) {
            return res.status(400).json({ message: 'Invalid plan ID' });
        }

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Check if company already has an active subscription
        const existingSubscription = await Subscription.findOne({
            companyId,
            status: 'active'
        });

        if (existingSubscription) {
            return res.status(400).json({ message: 'Company already has an active subscription' });
        }

        // Create new subscription
        const subscription = new Subscription({
            companyId,
            planId,
            status: 'active',
            startDate: new Date(),
            endDate: new Date(Date.now() + PLAN_LIMITS[planId].duration * 24 * 60 * 60 * 1000),
            jobPostingsRemaining: PLAN_LIMITS[planId].jobPostingLimit
        });

        await subscription.save();

        // Update company's subscription status
        company.plan = planId;
        company.isActive = true;
        company.planStartDate = subscription.startDate;
        company.planEndDate = subscription.endDate;
        company.jobPostingsRemaining = subscription.jobPostingsRemaining;
        await company.save();

        res.status(201).json(subscription);
    } catch (error) {
        // console.error('Error subscribing to plan:', error);
        res.status(500).json({ message: 'Error subscribing to plan' });
    }
};

// Get subscription status
export const getSubscriptionStatus = async (req, res) => {
    try {
        const companyId = req.company._id;

        if (!companyId) {
            return res.status(400).json({ message: 'Company ID is required' });
        }

        const subscription = await Subscription.findOne({
            companyId,
            status: 'active'
        });

        if (!subscription) {
            return res.status(404).json({ message: 'No active subscription found' });
        }

        const subscriptionStatus = {
            plan: subscription.planId,
            isActive: subscription.status === 'active',
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            jobPostingsRemaining: subscription.jobPostingsRemaining,
            planDetails: PLAN_LIMITS[subscription.planId]
        };

        res.json(subscriptionStatus);
    } catch (error) {
        // console.error('Error getting subscription status:', error);
        res.status(500).json({ message: 'Error getting subscription status' });
    }
};

// Cancel subscription
export const cancelSubscription = async (req, res) => {
    try {
        const companyId = req.company._id;

        if (!companyId) {
            return res.status(400).json({ message: 'Company ID is required' });
        }

        const subscription = await Subscription.findOne({
            companyId,
            status: 'active'
        });

        if (!subscription) {
            return res.status(404).json({ message: 'No active subscription found' });
        }

        // Update subscription status
        subscription.status = 'cancelled';
        subscription.endDate = new Date();
        await subscription.save();

        // Update company's subscription status
        const company = await Company.findById(companyId);
        company.plan = PLANS.FREE;
        company.isActive = false;
        company.planStartDate = null;
        company.planEndDate = null;
        company.jobPostingsRemaining = PLAN_LIMITS[PLANS.FREE].jobPostingLimit;
        await company.save();

        res.json({ message: 'Subscription cancelled successfully' });
    } catch (error) {
        // console.error('Error cancelling subscription:', error);
        res.status(500).json({ message: 'Error cancelling subscription' });
    }
}; 