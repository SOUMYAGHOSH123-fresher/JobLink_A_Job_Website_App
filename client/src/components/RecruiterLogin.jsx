import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


function RecruiterLogin() {
  const navigate = useNavigate();

  const[state, setState] = useState('Login');
  const [image, setImage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isTextDataSubmit, setIsTextDataSubmit] = useState(false);
  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext);  

  const onSubmitHandler = async (e) => { 
    e.preventDefault();

    if(state == 'Sing Up' && !isTextDataSubmit) {
      return setIsTextDataSubmit(true);
    }

    try {
      if(state === "Login"){
        const {data} = await axios.post(backendUrl + '/api/company/login', {email, password});
        if(data.success){
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        formData.append('password', password);
        formData.append('image', image);

        const { data } = await axios.post(backendUrl + '/api/company/register', formData);

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          toast.success(data.message);
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }  

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, []);
  
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-md bg-black/30 flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500' >
        <h1 className='text-center text-2xl text-neutral-600 font-medium'>Recruiter {state}</h1>
        <p className='text-sm text-center'>Welcome back! Please Sing in to Continue</p>
        {
        state === 'Sing Up' && isTextDataSubmit
          ? <>
              <div className='flex items-center gap-3 my-10'>
                <label htmlFor="image">
                  <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                  <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image'hidden/>
                </label>
                <p>Upload Company <br /> Logo</p>
              </div>
            </>
          : <>
            {state !== 'Login' && (
              <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                Company:
                <img className='h-5 w-5' src={assets.person_icon} alt="" />
                <input className="outline-none" onChange={e => setName(e.target.value)} type="text" name="name" value={name} placeholder='Company Name' required />
              </div>
            )}

            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              Email:
              <img className='h-5 w-5' src={assets.email_icon} alt="" />
              <input className="outline-none" onChange={e => setEmail(e.target.value)} type="text" name="email" value={email} placeholder='Enter Email' required />
            </div>
            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
              Password:
              <img className='h-5 w-5' src={assets.lock_icon} alt="" />
              <input className="outline-none" onChange={e => setPassword(e.target.value)} type="password" name="password" value={password} placeholder='Enter Password' required />
            </div>
      
              {state === 'Login' && <p className=' text-blue-500 font-medium mt-4 text-lg'>Forget Password?</p>}
          </>
        }  
        <button type='submit' className='rounded-full text-white py-3 bg-blue-500 w-full mt-4'>
          {state === 'Login' ? 'Login' : isTextDataSubmit ? 'Create Account' : 'Next' }
        </button>

        {
          state === 'Login'
          ? <p className='text-right mr-3 mt-3 from-neutral-300'>Don't have any Account? <span onClick={() => setState('Sing Up')} className='text-blue-500 cursor-pointer text-xl font-mono '>Sing Up</span></p>
          : <p className='text-right mr-3 mt-3 from-neutral-300'>Already hane any Account? <span onClick={() => setState('Login')} className='text-blue-500 cursor-pointer text-xl font-mono '>Login</span></p>
        }
        <div>
          <img onClick={(e)=> setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer w-5' src={assets.cross_icon} alt="" />
        </div>

      </form>
      
    </div>
  )
}

export default RecruiterLogin;