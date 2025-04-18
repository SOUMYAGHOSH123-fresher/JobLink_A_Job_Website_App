import { React, useContext, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'
import moment from 'moment'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Application = () => {

  const { user } = useUser();
  const { getToken } = useAuth();
  
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)
  
  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', resume);

      const token = await getToken();
      const { data } = await axios.post(backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto p-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white p-6 rounded-lg shadow mb-6'>
            <div className='flex gap-5 items-center mb-4'>
              <h2 className='text-xl font-semibold'>Resume</h2>
              {!isEdit ? (
                <button onClick={() => setIsEdit(true)} className='text-red-500 text-xl font-semibold'>Edit</button>
              ) : (
                <div className='flex gap-2'>
                  <input 
                    type="file" 
                    onChange={(e) => setResume(e.target.files[0])} 
                    className='text-sm'
                  />
                  <button onClick={updateResume} className='text-green-500'>Save</button>
                  <button onClick={() => setIsEdit(false)} className='text-red-500'>Cancel</button>
                </div>
              )}
            </div>
            {userData?.resume ? (
              <a href={userData.resume} target="_blank" rel="noopener noreferrer" className='text-blue-500 bg-blue-200 px-2 py-2 rounded-lg'>
                View Resume
              </a>
            ) : (
              <p className='text-gray-500'>No resume uploaded</p>
            )}
          </div>

          <h2 className='text-xl font-semibold mb-4'>Job Applied</h2>
          {userApplications.length > 0 ? (
            <table className='min-w-full bg-white border rounded-lg'>
              <thead>
                <tr>
                  <th className='px-4 py-3 border-b text-left'>Company</th>
                  <th className='px-4 py-3 border-b text-left'>Job Title</th>
                  <th className='px-4 py-3 border-b text-left max-sm:hidden'>Location</th>
                  <th className='px-4 py-3 border-b text-left max-sm:hidden'>Date</th>
                  <th className='px-4 py-3 border-b text-left'>Status</th>
                </tr>
              </thead>
              <tbody>
                {userApplications.map((job, index) => (
                  <tr key={index}>
                    <td className='px-4 py-3 flex items-center border-b gap-2'>
                      <img className='w-8 h-8' src={job.companyId.image} alt="" />
                      {job.companyId.name}
                    </td>
                    <td className='py-2 px-4 border-b'>{job.jobId?.title || 'Job not available'}</td>
                    {/* <td className='py-2 px-4 border-b'>{job.jobId.title}</td> */}
                    {/* <td className='py-2 px-4 border-b max-sm:hidden'>{job.jobId.location}</td> */}
                    <td className='py-2 px-4 border-b'>{job.jobId?.location || 'Job not available'}</td>                    
                    <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                    <td className='py-2 px-4 border-b'>
                      <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className='text-gray-500 text-center py-4'>No job applications yet</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Application;
