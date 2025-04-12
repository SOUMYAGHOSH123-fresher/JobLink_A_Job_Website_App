import React, { useContext, useEffect, useRef, useState } from 'react'
import Quill from 'quill';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

function AddJob() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bhubaneswar");
  const [category, setCategory] = useState('Programming');
  
  const [salary, setSalary] = useState(0);
  const [level, setLevel] = useState('Beginner Level');

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const OnSubmitHandler = async (e)=> {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML
      const { data } = await axios.post(backendUrl + '/api/company/post-job',
        { title, description, location, category, salary, level },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle("")
        setSalary(0)
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    // Initial Quill only Once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme:'snow',
      })  
    }
  },[])

  return (
    <div className='container flex flex-col items-start w-full p-4 gap-3 border-2 shadow-sm rounded-lg hover:shadow-2xl'>
      <h1 className="mb-5 ml-auto w-2/3 text-2xl font-medium underline"> Add Job</h1>
      <form onSubmit={OnSubmitHandler}>
        <label className="w-full" htmlFor='title'>
          <p className="mb-2">Job Title: </p>
          <input
            className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded-lg"
            type="text"
            placeholder='Type Here'
            id='title'
            onChange={e => setTitle(e.target.value)}
            value={title}
            required 
          />
        </label>

        <label className='w-full max-w-lg' htmlFor='description'>
          <p className='my-2'>Job Description: </p>
          <div ref={editorRef}></div>
        </label>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 mt-3'>
          <label className='mb-2' htmlFor='category'>
            <p>Job Categary: </p>
            <select className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg'
              onChange={e => setCategory(e.target.value)}>
              {JobCategories.map((category, index) => (
                <option key={index} value={category}>{category }</option>
              ))}
            </select>
          </label>

          <label className='mb-2' htmlFor='location'>
            <p>Job Location: </p>
            <select className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg' onChange={e => setLocation(e.target.value)}>
              {JobLocations.map((location, index) => (
                <option key={index} value={location}>{location }</option>
              ))}
            </select>
          </label>

          <label className='mb-2' htmlFor='level'>
            <p>Job Level: </p>
            <select className='w-full px-3 py-2 border-2 border-gray-300 rounded-lg' onChange={e => setLevel(e.target.value)}>
              <option value="Begineer Level">Begineer Level</option>
              <option value="Intermediate Level">Intermediate Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
          </label>
        </div>

        <div >
          <p className='mb-2'>Job Salary:</p>
          <input min={0} className='w-28 w-sm px-3 py-2 border-2 border-gray-300 rounded-lg' onChange={e => setSalary(e.target.value)} type="number" value={salary} />
        </div>

        <button className='w-28 py-2 px-3 mt-4 bg-black rounded-lg text-white hover:bg-blue-400 hover:text-white'>Add</button>
      </form>
    </div>
  )
}

export default AddJob