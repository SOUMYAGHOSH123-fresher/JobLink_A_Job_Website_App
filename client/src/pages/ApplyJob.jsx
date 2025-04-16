import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {
  
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }    
  }

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Please login to apply for this job');
      }

      if (!userData.resume) {
        navigate('/applications');
        return toast.error("Upload resume to apply");
      }
      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/apply',
        { jobId: jobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
    
  const checkAlreadyApplied = async () => {
    const hasApplied = userApplications.some(item => item.jobId._id === jobData._id)
    setIsAlreadyApplied(hasApplied);
  }

  useEffect(() => {    
    fetchJob()    
  }, [id])

  useEffect(() => {
    if (userApplications.length > 0 && jobData) {
      checkAlreadyApplied()
    }
  }, [jobData, userApplications, id])

  return jobData ? (
    <>
      <Navbar />

      <div className='min-h-screen flex py-10 container px-4 2xl:px-20 mx-auto'>
        <div className='bg-white text-black rounded-lg w-full'>
          <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center'>
              <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={jobData.companyId.image} alt="company_icon" />
              <div className='text-center md:text-left text-neutral-700 '>
                <h1 className='text-2xl sm:text-4xl font-medium'>{jobData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.money_icon} alt="" />
                    CRC: {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center text-sm text-end max-md:mx-auto mx-md:text-center'>
              <button
                onClick={applyHandler}
                className={`${isAlreadyApplied ? 'bg-gray-500' : 'bg-blue-600'} p-2.5 text-white rounded px-10`}
              >
                {isAlreadyApplied ? "Already Applied" : "Apply Now"}
              </button>
              <p className='text-gray-600 mt-1'>posted {moment(jobData.date).fromNow()}</p>
            </div>

          </div>


          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='text-2xl mb-4 font-bold'>Job Description</h2>
              <div className='rich-text' dangerouslySetInnerHTML={{ __html: jobData.description }}></div>
              <button onClick={applyHandler}
                className={`${isAlreadyApplied ? 'bg-gray-500' : 'bg-blue-600'} p-2.5 text-white rounded px-10`}>{isAlreadyApplied ? "Already Applied" : "Apply Now"}</button>
            </div>
            {/* right section more job */}
            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
              <h2>More job from {jobData.companyId.name}</h2>
              {jobs.filter(job => job._id !== jobData._id && job.companyId._id === jobData.companyId._id)
                .filter(job => true).slice(0, 3)
                .map((job, index) => <JobCard key={index} job={job} />)}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob;
