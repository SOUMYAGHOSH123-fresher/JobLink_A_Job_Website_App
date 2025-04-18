import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function ManageJobs() {

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const { backendUrl, companyToken } = useContext(AppContext);

  // function to fetch company Job Applications data
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/job-list',
        { headers: { token: companyToken } }
      )
      if (data.success) {
        setJobs(data.jobsData.reverse());
        // console.log(data.jobsData);
        // console.log(jobs);        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const changeVisibility = async (id) => { 
    try {

      const { data } = await axios.post(backendUrl + '/api/company/change-visibility',
        { id },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }
    
  

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken])

  return jobs ? jobs.length === 0 ? (
  <div className='flex items-center justify-center h-[70vh]'>
    <p className='text-xl text-red-500 sm:text-2xl'>No Jobs Available or Posted</p>
  </div>) : (
    <div className='container max-w-5xl p-4'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b text-left'>Job Title</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 border-b text-center'>Applicants</th>
              <th className='py-2 px-4 border-b text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className='text-gray-700'>
                <td className='py-2 px-4 border-b text-left max-sm:hidden'>{index + 1}</td>
                <td className='py-2 px-4 border-b text-left'>{job.title}</td>
                <td className='py-2 px-4 border-b text-left max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b text-left max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                <td className='py-2 px-4 border-b text-left'>
                  <input onChange={ () => changeVisibility(job._id) } className='scale-125 ml-4' type="checkbox" checked={ job.visible} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
        <button onClick={() => navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded'>Add new jobbs</button>
      </div>
    </div>
  ) : <Loading/>
}

export default ManageJobs