import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { PLANS, PLAN_LIMITS } from '../config/plans.js';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    logo: {
        type: String
    },
    plan: {
        type: String,
        enum: Object.values(PLANS),
        default: PLANS.FREE
    },
    isActive: {
        type: Boolean,
        default: true
    },
    planStartDate: {
        type: Date,
        default: Date.now
    },
    planEndDate: {
        type: Date,
        default: Date.now
    },
    jobPostingsRemaining: {
        type: Number,
        default: PLAN_LIMITS[PLANS.FREE].jobPostingLimit
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpiry: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true
});

// Hash password before saving
companySchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
companySchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to update plan
companySchema.methods.updatePlan = async function(newPlan) {
    this.plan = newPlan;
    this.isActive = true;
    this.planStartDate = new Date();
    this.planEndDate = new Date(Date.now() + PLAN_LIMITS[newPlan].duration * 24 * 60 * 60 * 1000);
    this.jobPostingsRemaining = PLAN_LIMITS[newPlan].jobPostingLimit;
    await this.save();
};

// Method to check if company can post more jobs
companySchema.methods.canPostJob = function() {
    return this.isActive && 
           this.planEndDate > new Date() && 
           this.jobPostingsRemaining > 0;
};

const Company = mongoose.model('Company', companySchema);

export default Company;