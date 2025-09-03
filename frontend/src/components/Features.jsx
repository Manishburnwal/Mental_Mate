import React from 'react'
import { FaHeart, FaComments, FaChartLine, FaUserMd } from 'react-icons/fa'
import { MdPsychology, MdSelfImprovement } from 'react-icons/md'
import { BiShield, BiTime } from 'react-icons/bi'

function Features() {
  const features = [
    {
      icon: <MdPsychology className="w-8 h-8" />,
      title: "Anxiety Support",
      description: "Get personalized help managing anxiety with proven techniques and daily coping strategies."
    },
    {
      icon: <MdSelfImprovement className="w-8 h-8" />,
      title: "Stress Management",
      description: "Learn effective stress reduction techniques tailored to your lifestyle and needs."
    },
    {
      icon: <FaComments className="w-8 h-8" />,
      title: "AI Chat Therapy",
      description: "24/7 access to intelligent conversations that understand and respond to your emotions."
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Mood Tracking",
      description: "Monitor your emotional patterns and progress with detailed insights and reports."
    },
    {
      icon: <BiShield className="w-8 h-8" />,
      title: "Depression Support",
      description: "Get compassionate support and evidence-based strategies to help manage depression symptoms."
    },
    {
      icon: <BiTime className="w-8 h-8" />,
      title: "Always Available",
      description: "Get support whenever you need it, day or night, without appointments or waiting."
    }
  ]

  return (
    <div className="w-full bg-black py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Mental Health Support That Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto pb-[20px]">
            Comprehensive AI-powered mental health services designed to support your wellness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg border border-white shadow-lg transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-white group">
              <div className="flex justify-center mb-4 text-white group-hover:text-black transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-300 group-hover:text-black mb-3 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-500 group-hover:text-black transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features