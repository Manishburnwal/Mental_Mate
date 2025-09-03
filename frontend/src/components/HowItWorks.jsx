import React from 'react'
import { FaUserPlus, FaComments, FaChartLine, FaRocket } from 'react-icons/fa'
import { MdAssessment } from 'react-icons/md'
import { BiTargetLock } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function HowItWorks() {
  const navigate = useNavigate()
  const {userData} = useSelector((state)=>state.user) 
  const steps = [
    {
      step: "01",
      icon: <FaUserPlus className="w-8 h-8" />,
      title: "Sign Up & Assessment",
      description: "Create your account and complete our comprehensive mental health assessment to understand your unique needs and goals."
    },
    {
      step: "03",
      icon: <FaComments className="w-8 h-8" />,
      title: "Start AI Conversations",
      description: "Begin your therapeutic journey with our AI companion. Chat anytime, get instant support, and practice new skills daily."
    },
    {
      step: "04",
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Track Your Progress",
      description: "Monitor your mental health journey with detailed insights, mood tracking, and celebrate your improvements over time."
    }
  ]

  return (
    <div className="w-full bg-black py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-400 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Get started on your mental health journey in just four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6 rounded-lg border border-white shadow-lg shadow-white transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-white group relative">
           
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black group-hover:bg-white border border-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300">
                <span className="text-white group-hover:text-black font-bold text-lg transition-colors duration-300">
                  {step.step}
                </span>
              </div>
              
              <div className="flex justify-center mb-4 mt-8 text-white group-hover:text-black transition-colors duration-300">
                {step.icon}
              </div>
              

              <h3 className="text-xl font-semibold text-gray-300 group-hover:text-black mb-3 transition-colors duration-300">
                {step.title}
              </h3>
              
       
              <p className="text-gray-500 group-hover:text-black transition-colors duration-300">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-white">
                  <FaRocket className="w-6 h-6 rotate-45 opacity-50" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          {!userData ? <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer duration-300 shadow-lg" onClick={()=>navigate("/login")}>
            Start Your Journey Today
          </button> : <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 cursor-pointer transition-colors duration-300 shadow-lg" onClick={()=>navigate("/chat")}>
            Get Started Now
          </button>}
        </div>
      </div>
    </div>
  )
}

export default HowItWorks