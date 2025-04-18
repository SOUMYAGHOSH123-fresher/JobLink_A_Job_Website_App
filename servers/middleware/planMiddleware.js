import { PLANS, getPlanDetails } from '../config/plans.js';
import Company from '../models/Company.js';

export const checkJobPostingLimit = async (req, res, next) => {
    try {
        const companyId = req.user.companyId;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.json({ message: 'Company not found' });
        }

        // Check if company has an active plan
        if (!company.isActive || company.planEndDate < new Date()) {
            return res.json({ 
                message: 'Your plan has expired. Please upgrade to continue posting jobs.' 
            });
        }

        // Check remaining job postings
        if (company.jobPostingsRemaining <= 0) {
            return res.json({ 
                message: 'You have reached your job posting limit. Please upgrade your plan to post more jobs.' 
            });
        }

        next();
    } catch (error) {
        // console.error('Error in checkJobPostingLimit middleware:', error);
        res.json({ message: 'Internal server error' });
    }
};

export const updateJobPostingCount = async (companyId) => {
    try {
        const company = await Company.findById(companyId);
        if (!company) {
            throw new Error('Company not found');
        }

        company.jobPostingsRemaining -= 1;
        await company.save();
    } catch (error) {
        // console.error('Error updating job posting count:', error);
        throw error;
    }
};

export const validatePlanUpgrade = async (req, res, next) => {
    try {
        const { newPlan } = req.body;
        const companyId = req.user.companyId;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.json({ message: 'Company not found' });
        }

        // Validate plan exists
        if (!Object.values(PLANS).includes(newPlan)) {
            return res.json({ message: 'Invalid plan selected' });
        }

        // Prevent downgrading to free plan if company has active job postings
        if (newPlan === PLANS.FREE) {
            const activeJobCount = await Job.countDocuments({ 
                companyId, 
                visible: true 
            });
            
            if (activeJobCount > 1) {
                return res.json({ 
                    message: 'Cannot downgrade to free plan while having more than 1 active job posting' 
                });
            }
        }

        next();
    } catch (error) {
        // console.error('Error in validatePlanUpgrade middleware:', error);
        res.json({ message: 'Internal server error' });
    }
}; 