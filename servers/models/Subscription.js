import mongoose from 'mongoose';
import { PLANS } from '../config/plans.js';

const subscriptionSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    planId: {
        type: String,
        enum: Object.values(PLANS),
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    jobPostingsRemaining: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

// Index for faster queries
subscriptionSchema.index({ companyId: 1, status: 1 });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription; 