# JobLink - Job Website Application
JobLink is a modern job board platform that connects job seekers with employers. It provides a seamless experience for both job seekers looking for opportunities and companies looking to hire talent.

## 🌟 Features

### For Job Seekers
- **User Authentication**: Secure login and registration using Clerk
- **Job Search**: Browse and search for jobs with advanced filtering options
- **Job Applications**: Apply to jobs with a streamlined application process
- **Resume Management**: Upload and manage your resume
- **Application Tracking**: Track the status of your job applications
- **Subscription Plans**: Choose from different subscription tiers for enhanced visibility

### For Employers/Recruiters
- **Company Profiles**: Create and manage your company profile
- **Job Posting**: Post and manage job listings
- **Applicant Management**: Review and manage job applications
- **Subscription Plans**: Choose from different subscription tiers for enhanced job posting capabilities
- **Analytics**: Track the performance of your job postings

## 🛠️ Tech Stack

### Frontend
- **React**: UI library for building the user interface
- **React Router**: For navigation and routing
- **Tailwind CSS**: For styling and responsive design
- **Clerk**: For authentication and user management
- **Axios**: For API requests
- **React Toastify**: For notifications and alerts

### Backend
- **Node.js**: JavaScript runtime for the server
- **Express**: Web framework for building the API
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: For authentication tokens
- **Cloudinary**: For image and file storage
- **Sentry**: For error tracking and monitoring

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account
- Clerk account

## 🚀 Getting Started

### Clone the Repository
```bash
git clone https://github.com/yourusername/JobLink_A_Job_Website_App.git
cd JobLink_A_Job_Website_App
```

### Backend Setup
```bash
cd servers
npm install
```

Create a `.env` file in the servers directory with the following variables:
```
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Start the server:
```bash
npm run server
```

### Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file in the client directory with the following variables:
```
VITE_BACKEND_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the client:
```bash
npm run dev
```

## 📁 Project Structure

```
JobLink_A_Job_Website_App/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   │   ├── assets/         # Images, icons, etc.
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS styles
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── .env                # Frontend environment variables
│   └── package.json        # Frontend dependencies
│
├── servers/                # Backend Node.js application
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── .env                # Backend environment variables
│   ├── server.js           # Entry point
│   └── package.json        # Backend dependencies
│
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## 🔑 Environment Variables

### Backend (.env)
- `JWT_SECRET`: Secret key for JWT token generation
- `MONGODB_URI`: MongoDB connection string
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_SECRET_KEY`: Cloudinary secret key
- `CLOUDINARY_NAME`: Cloudinary cloud name
- `CLERK_WEBHOOK_SECRET`: Clerk webhook secret
- `CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `CLERK_SECRET_KEY`: Clerk secret key

### Frontend (.env)
- `VITE_BACKEND_URL`: Backend API URL
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk publishable key

## 📱 API Endpoints

### Authentication
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login a user
- `GET /api/users/profile`: Get user profile

### Jobs
- `GET /api/jobs`: Get all jobs
- `GET /api/jobs/:id`: Get job by ID
- `POST /api/jobs`: Create a new job
- `PUT /api/jobs/:id`: Update a job
- `DELETE /api/jobs/:id`: Delete a job

### Companies
- `POST /api/company/register`: Register a new company
- `POST /api/company/login`: Login a company
- `GET /api/company/profile`: Get company profile
- `PUT /api/company/profile`: Update company profile

### Applications
- `POST /api/users/apply`: Apply for a job
- `GET /api/users/applications`: Get user applications
- `GET /api/company/applications`: Get company applications

### Subscriptions
- `GET /api/subscriptions/plans`: Get subscription plans
- `POST /api/subscriptions/subscribe`: Subscribe to a plan
- `GET /api/subscriptions/status`: Get subscription status
- `POST /api/subscriptions/cancel`: Cancel subscription

## 🚀 Deployment

### Backend (Vercel)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set up environment variables in Vercel
4. Deploy

### Frontend (Vercel/Netlify)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel/Netlify
3. Set up environment variables
4. Deploy

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Your Name - Initial work

## 🙏 Acknowledgments

- Clerk for authentication
- MongoDB for database
- Cloudinary for file storage
- Tailwind CSS for styling
