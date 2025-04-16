import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/SubscriptionPlans.css';

const SubscriptionPlans = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { backendUrl, companyToken } = useContext(AppContext);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/subscriptions/plans`);
        setPlans(response.data);
        
        // Fetch current subscription status if user is logged in
        if (companyToken) {
          const subscriptionResponse = await axios.get(
            `${backendUrl}/api/subscriptions/status`,
            { headers: { token: companyToken } }
          );
          setCurrentSubscription(subscriptionResponse.data);
        }
      } catch (err) {
        setError('Failed to load subscription plans');
        console.error('Error fetching plans:', err);
        toast.error(err.response?.data?.message || 'Failed to load subscription plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [backendUrl, companyToken]);

  const handleSubscribe = async (planId) => {
    try {
      if (!companyToken) {
        toast.error('Please login to subscribe to a plan');
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/subscriptions/subscribe`,
        { planId },
        { headers: { token: companyToken } }
      );

      // Refresh subscription status
      const subscriptionResponse = await axios.get(
        `${backendUrl}/api/subscriptions/status`,
        { headers: { token: companyToken } }
      );
      setCurrentSubscription(subscriptionResponse.data);
      toast.success('Successfully subscribed to plan!');
    } catch (err) {
      console.error('Error subscribing:', err);
      toast.error(err.response?.data?.message || 'Failed to subscribe to plan');
    }
  };

  const handleCancelSubscription = async () => {
    try {
      if (!companyToken) {
        toast.error('Please login to cancel your subscription');
        return;
      }

      await axios.post(
        `${backendUrl}/api/subscriptions/cancel`,
        {},
        { headers: { token: companyToken } }
      );

      setCurrentSubscription(null);
      toast.success('Subscription cancelled successfully');
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      toast.error(err.response?.data?.message || 'Failed to cancel subscription');
    }
  };

  if (loading) return <div className="loading">Loading subscription plans...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="subscription-plans">
        <h2>Subscription Plans</h2>
        {currentSubscription && (
          <div className="current-subscription">
            <h3>Current Subscription</h3>
            <p>Plan: {currentSubscription.plan}</p>
            <p>Status: {currentSubscription.isActive ? 'Active' : 'Inactive'}</p>
            <p>Valid until: {new Date(currentSubscription.endDate).toLocaleDateString()}</p>
            <p>Job postings remaining: {currentSubscription.jobPostingsRemaining}</p>
            {currentSubscription.isActive && (
              <button onClick={handleCancelSubscription} className="cancel-btn">
                Cancel Subscription
              </button>
            )}
          </div>
        )}
        <div className="plans-container">
          {plans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <h3>{plan.name}</h3>
              <p className="price">${plan.price}/month</p>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button 
                onClick={() => handleSubscribe(plan.id)}
                disabled={currentSubscription?.plan === plan.id && currentSubscription?.isActive}
                className="subscribe-btn"
              >
                {currentSubscription?.plan === plan.id && currentSubscription?.isActive
                  ? 'Current Plan'
                  : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SubscriptionPlans; 