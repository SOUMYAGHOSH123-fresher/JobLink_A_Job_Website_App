import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const RecruiterPlan = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { backendUrl, companyToken } = useContext(AppContext);
  const navigate = useNavigate();

  // Only redirect to dashboard if coming from another page
  // This allows the plan page to be viewed when directly navigating to it
  useEffect(() => {
    const referrer = document.referrer;
    const isFromDashboard = referrer.includes('/dashboard');
    
    if (companyToken && isFromDashboard) {
      navigate('/dashboard');
    }
  }, [companyToken, navigate]);

  const handleSelectPlan = async (planName) => {
    if (!user) {
      toast.error('Please login to select a plan');
      return;
    }

    try {
      const token = await getToken();
      // This is a placeholder for the actual API call
      // You would implement the actual payment processing here
      const { data } = await axios.post(
        backendUrl + '/api/company/select-plan',
        { plan: planName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(`Successfully selected ${planName} plan!`);
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Failed to select plan');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred while selecting your plan');
    }
  };

  const plans = [
    {
      title: "Basic Recruiter",
      price: "$49",
      period: "month",
      features: [
        "Post up to 3 jobs",
        "Basic applicant tracking",
        "Email notifications",
        "Basic analytics",
        "Standard support"
      ],
      action: "Start Hiring",
    },
    {
      title: "Pro Recruiter",
      price: "$99",
      period: "month",
      features: [
        "Post up to 10 jobs",
        "Advanced applicant tracking",
        "Candidate filtering",
        "Interview scheduling",
        "Advanced analytics",
        "Priority support",
        "Featured job listings"
      ],
      action: "Upgrade Now",
      highlight: true,
    },
    {
      title: "Enterprise",
      price: "$199",
      period: "month",
      features: [
        "Unlimited job postings",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security features",
        "24/7 premium support"
      ],
      action: "Contact Sales",
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-pink-900 dark:text-white mb-4">
            Plans for Recruiters
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
            Find the best talent faster with the right tools and support.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 shadow-xl relative transition-transform hover:scale-105 border-2 dark:bg-zinc-900 dark:border-zinc-700 ${
                  plan.highlight 
                    ? "border-pink-600 bg-pink-50 dark:bg-pink-950" 
                    : "border-gray-200 bg-white dark:bg-zinc-800"
                }`}
              >
                <h3 className="text-2xl font-semibold text-pink-800 dark:text-white mb-2">
                  {plan.title}
                </h3>
                <p className="text-3xl font-bold text-pink-900 dark:text-white mb-6">
                  {plan.price}
                  {plan.period && (
                    <span className="text-base font-medium text-gray-500">/{plan.period}</span>
                  )}
                </p>
                <ul className="text-left space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-800 dark:text-gray-200">
                      <CheckCircle2 className="text-green-500 mt-1" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelectPlan(plan.title)}
                  className={`w-full py-3 px-6 rounded-full font-medium transition-colors ${
                    plan.highlight
                      ? "bg-pink-600 hover:bg-pink-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {plan.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RecruiterPlan; 