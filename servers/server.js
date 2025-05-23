import './config/instrument.js'
import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import { clerkMiddleware } from '@clerk/express';

// initialize express
const app = express();

// Middlewares
app.use(cors())
app.use(express.json())

// Use Clerk middleware with proper configuration
app.use(clerkMiddleware({
  // Add debug mode to see what's happening
  debug: true
}));

// Routes
app.get('/', (req, res) => res.send("API Working"));

// Verify Your Setup
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Port
const port = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Connect to Cloudinary
    await connectCloudinary();
    
    // Start the server
    app.listen(port, () => {
      console.log(`Server Running on Port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    // Still start the server even if database connection fails
    app.listen(port, () => {
      console.log(`Server Running on Port ${port} (without database connection)`);
    });
  }
};

startServer();

