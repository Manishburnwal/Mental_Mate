import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { MdHealthAndSafety } from 'react-icons/md'
import { BiShield } from 'react-icons/bi'

function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Section - Logo/Image and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                <MdHealthAndSafety className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">MentalMate</h3>
                <p className="text-gray-400 text-sm">Your AI Companion</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Comprehensive AI-powered mental health services designed to support your wellness journey with personalized care and 24/7 availability.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Crisis Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Professional Help</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaPhone className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-400 text-sm">support@mentalmate.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-gray-400 text-sm">123 Wellness Street, Mind City, MC 12345</span>
              </div>
            </div>
            
            {/* Crisis Hotline */}
            <div className="mt-6 p-3 border border-red-500 rounded-lg">
              <div className="flex items-center mb-2">
                <BiShield className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-red-500 text-sm font-semibold">Crisis Support</span>
              </div>
              <p className="text-gray-400 text-xs">
                If you're in crisis, call <span className="text-white font-semibold">988</span> (Suicide & Crisis Lifeline) or <span className="text-white font-semibold">911</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 MentalMate. All rights reserved. | Not a replacement for professional medical advice.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-xs">Secured by</span>
              <BiShield className="w-5 h-5 text-green-500" />
              <span className="text-gray-400 text-xs">256-bit SSL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer