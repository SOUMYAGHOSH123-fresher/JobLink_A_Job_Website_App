import React from 'react'
import { assets } from '../assets/assets';

function Footer() {
  return (
    <div className='container px-4 2xl:px-20 m-auto flex items-center justify-between gap-4 py-3 mt-20'>
        <img src={assets.logo} alt="" /> 
        <p className='flex-2 border-l text-md text-gray-400 pl-4 max-sm:hidden'>@Copyright: 2024 | JobLink Website</p>
        <div className='flex gap-3'>
            <img width={40} src={assets.facebook_icon} alt="" />
            <img width={40} src={assets.instagram_icon} alt="" />
            <img width={40} src={assets.twitter_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer;