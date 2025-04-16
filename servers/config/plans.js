export const PLANS = {
    FREE: 'free',
    STARTER: 'starter',
    PROFESSIONAL: 'professional',
    ENTERPRISE: 'enterprise'
};

export const PLAN_LIMITS = {
    [PLANS.FREE]: {
        jobPostingLimit: 5,
        duration: 30, // days
        features: ['Basic job posting', 'Basic company profile', 'Limited Job Posting', 'Low Chance to get Selected', 'Low Profile Score']
    },
    [PLANS.STARTER]: {
        jobPostingLimit: 15,
        duration: 30,
        features: [
            'Up to 15 job postings',
            'Enhanced company profile',
            'Basic analytics',
            'Email support',
            'Chance to get Selected',
        ]
    },
    [PLANS.PROFESSIONAL]: {
        jobPostingLimit: 30,
        duration: 30,
        features: [
            'Up to 30 job postings',
            'Premium company profile',
            'Advanced analytics',
            'Priority support',
            'Featured job listings'
        ]
    },
    [PLANS.ENTERPRISE]: {
        jobPostingLimit: 50,
        duration: 30,
        features: [
            'Unlimited job postings',
            'Custom branding',
            'API access',
            'Dedicated support',
            'Custom integrations'
        ]
    }
};

export const PLAN_PRICES = {
    [PLANS.FREE]: 0,
    [PLANS.STARTER]: 0.99,
    [PLANS.PROFESSIONAL]: 9.99,
    [PLANS.ENTERPRISE]: 19.99
};

export const getPlanDetails = (planName) => {
    return PLAN_LIMITS[planName] || PLAN_LIMITS[PLANS.FREE];
};

export const calculatePlanEndDate = (startDate, duration) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
    return endDate;
}; 