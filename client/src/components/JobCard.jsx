import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

function JobCard({ job }) {

  const navigate = useNavigate()

  return (
    <div className='border p-6 shadow rounded'>
      <div className='flex justify-between items-center'>
        <img className='h-10' src={job.companyId.image} alt="" />
      </div>
      <h4 className='font-medium text-xl mt-3'>{job.title}</h4>
      <div className='flex items-center gap-3 mt-2 text-xs'>
        <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 text-md font-medium'>{job.location}</span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 text-md font-medium'>{job.level}</span>
      </div>
      <p className='text-gray-500 text-sm mt-2 text-justify' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>
      <div className='flex gap-3 mt-3 px-2 text-sm'>
        <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className=' bg-blue-500 text-gray-50 px-3 py-2 rounded shadow'>Apply Now</button>
        <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className=' text-gray-500 border border-gray-500 px-4 py-2'>Learn More 🎓</button>
      </div>
    </div>
  )
}

export default JobCard