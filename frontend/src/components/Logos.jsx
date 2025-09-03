import React from 'react'
import { FiHeart } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

function Logos() {
  return (
    <div className='w-[100vw] min-h-[80px] bg-black flex items-center justify-center flex-wrap gap-4'>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-black cursor-pointer text-white border-2 border-white'>
            <FiHeart className='w-[25px] h-[25px] fill-white'/>
            AI Therapy Sessions
        </div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-black cursor-pointer text-white border-2 border-white'>
            <MdAccessTime className='w-[25px] h-[25px] fill-white'/>
            24/7 Availability
        </div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-black cursor-pointer text-white border-2 border-white'>
            <BiSupport className='w-[25px] h-[25px] fill-white'/>
            Expert Support
        </div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-black cursor-pointer text-white border-2 border-white'>
            <FaUsers className='w-[25px] h-[25px] fill-white'/>
            Community Support
        </div>
    </div>
  )
}

export default Logos