import React from 'react'
import { FaFacebook ,FaLinkedin } from "react-icons/fa";
import {IoLogoInstagram} from "react-icons/io";

function Topbar() {
  return (
    <div className='bg-[#ea2e0e] text-white'>
      <div  className='container mx-auto flex justify-between items-center py-3  px-4'>
      <div className='hidden md:flex items-center space-x-4'>
        <a href='#' className='hover:text-gray-300'>
            <FaFacebook className='h-4 w-4'/>
        </a>
        <a href='#' className='hover:text-gray-300'>
            <IoLogoInstagram className='h-5 w-5'/>
        </a>
        <a href='#' className='hover:text-gray-300'>
            <FaLinkedin  className='h-4 w-4'/>
        </a>
      </div>
      <div className='text-sm text-center flex-grow'>
          <span>We ship worldwide - Fast and reliable shipping!</span>
      </div>
      <div className='text-sm hidden md:block'>
      <a href='tel:+0312362223' className='hover:text-gray-300'>
        +92(312) - 7362223
      </a>

      </div>
      </div>
    </div>
  )
}

export default Topbar
