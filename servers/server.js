import './config/instrument.js'
import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';

// initialize express
const app = express();

// Connect to database
await connectDB();

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send("API Working"));

// Verify Your Setup
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebhooks)

// Port
const port = process.env.port || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(port, ()=>{
    console.log(`Server Running on Port ${port}`);
})