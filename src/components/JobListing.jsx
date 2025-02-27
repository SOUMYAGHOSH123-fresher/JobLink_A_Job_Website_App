import React, { useContext } from 'react'
import { AppContext } from './../context/AppContext';
import { assets, JobCategories, JobLocations } from './../assets/assets';

function JobListing() {
    const { isSearch, setIsSearch, searchFilter, setsearchFilter } = useContext(AppContext);
  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
        {/* Sidebar */}
        <div className='w-full lg:w-1/4 bg-white px-4'>
            {/* Search Filter from Hero Component */}
            {isSearch && (searchFilter.title !== "" || searchFilter.location !== "") && (
                <div>
                    <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                    <div className='mb-4 text-gray-600'>
                        {searchFilter.title && (
                            <span className='inline-flex items-center gap-2.5 bg-blue-100 border border-blue-400 px-4 py-1.5 rounded font-medium'>
                                {searchFilter.title}
                                <img onClick={e => setsearchFilter(prev =>({...prev, title:""}))} className='cursor-pointerr' src={assets.cross_icon} alt="" />
                            </span>
                        )}                        
                        {searchFilter.title && (
                            <span className='ml-2 inline-flex items-center gap-2.5 bg-red-100 border border-red-400 px-4 py-1.5 rounded font-medium'>
                                {searchFilter.location}
                                <img onClick={e => setsearchFilter(prev =>({...prev, location:""}))} className='cursor-pointerr' src={assets.cross_icon} alt="" />
                            </span>
                        )}
                    </div>                    
                </div>
            )}


            {/* Category Filter */}
            <div className='max-lg:hidden'>
                <h3 className='font-medium text-lg py-4'>Search by Category</h3>
                <ul className='space-y-4 text-gray-600'>
                    {JobCategories.map((category, index) => (
                    <li key={index} className='flex gap-3 items-center'>
                        <input className='scale-125' type="checkbox" name={category} id={category} />
                        {category}
                    </li>
                    ))}
                </ul>
            </div>

            {/* Location Filter */}
            <div className='max-lg:hidden'>
                <h3 className='font-medium text-lg py-4 pt-16'>Search by Location</h3>
                <ul className='space-y-4 text-gray-600'>
                    {JobLocations.map((location, index) => (
                    <li key={index} className='flex gap-3 items-center'>
                        <input className='scale-125' type="checkbox" name={location} id={location} />
                        {location}
                    </li>
                    ))}
                </ul>
            </div>
         </div>
          
        
        {/* Job Listings */}
        <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
            <h3 className='font-medium text-4xl md:text-3xl lg:text-5xl py-2 mb-4' id='job-list'>Latest Jobs</h3>
            <p className='mb-8'>Get Your Dream Job From Top Companies</p>  
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                
            </div>
        </section>
    </div>
  )
}

export default JobListing