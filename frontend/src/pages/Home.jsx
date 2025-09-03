import React from 'react'
import Nav from '../components/Nav'
import bg from '../assets/BGvideo.mp4'
import Logos from '../components/Logos'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      {/* Hero Section */}
      <div className='w-full min-h-screen overflow-hidden relative'>
        <Nav/>     
        {/* Background */}
        <div className='absolute inset-0 bg-black'>
          <video 
            src={bg}
            autoPlay
            loop
            muted
            playsInline
            className='w-full h-full object-cover opacity-50'
          />
        </div>
        {/* Main content */}
        <div className='relative z-10 flex flex-col items-center justify-center min-h-screen pt-16 px-4'>
          <div className='text-center max-w-4xl'>
            <h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r text-[#b7f8f4] mb-6 leading-tight'>
              Heal Your Mind with 
              <span className='block mt-2'>Mental Mate AI</span>
            </h1>
            
            <p className='text-xl md:text-2xl text-gray-100 mb-12 max-w-2xl mx-auto'>
              Your personal AI therapist companion for mental wellness and emotional support
            </p>
            
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
              <button 
                className='px-8 py-4 bg-black text-white border-2 border-white font-semibold rounded-2xl hover:bg-white hover:text-black cursor-pointer transition-all duration-200 text-lg min-w-[200px]' 
                onClick={() => navigate("/selection")}
              >
                Start Therapy Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logos Section */}
      <Logos/>
      <Features/>
      <HowItWorks/>
      <Footer/>
    </>
  )
}

export default Home