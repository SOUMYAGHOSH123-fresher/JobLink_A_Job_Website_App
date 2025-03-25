import React, { useContext, useRef, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
  const { setIsSearch, setsearchFilter } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => { 
    setIsSearch(true);
    setsearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    })
    // console.log({
    //   title: titleRef.current.value,
    //   location: locationRef.current.value
    // });    
  }
  
  return (
    <div className='container 2x1:px-20 mx-auto my-10'>
      <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 mx-2 text-center rounded-xl'>
          <h2 className='text-4xl md:text-3x1 lg:text-5x1 font-medium mb-4'>Over 1000+ Jobs to apply</h2>
          <p className='mb-8 max-w-xl mx-auto text-md font-light px-5'>
              Find your dream job Here - Explore The Best Job Oppertunities
              And Take The First Step Towards Your Future With JobLink:
        </p>
        <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
          <div className='flex items-center'>
            <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
            <input type="text"
              placeholder='Search for jobs'
              className='max-sm:text-xs p-2 rounded outline-none w-full'
              ref={titleRef}
            />
          </div>
          <div className='flex items-center'>
            <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
            <input type="text"
              placeholder='Search for location'
              className='max-sm:text-xs p-2 rounded outline-none w-full'
              ref={locationRef}
            />
          </div>
          <button onClick={onSearch} className='px-6 py-2 rounded text-white bg-blue-500 m-1'>Search</button>
        </div>
      </div>  
      <div>
        <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
          <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
            <p className='font-medium'>
              Trusted By</p>
            <img className='h-6' src={assets.microsoft_logo} alt="" />
            <img className='h-6' src={assets.accenture_logo} alt="" />
            <img className='h-6' src={assets.amazon_logo} alt="" />
            <img className='h-6' src={assets.walmart_logo} alt="" />
            <img className='h-6' src={assets.microsoft_logo} alt="" />
            <img className='h-6' src={assets.samsung_logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;
