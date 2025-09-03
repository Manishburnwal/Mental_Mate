import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiUser, FiMail, FiEdit3, FiCalendar, FiCheck, FiX, FiCamera, FiShield, FiClock, FiSettings } from "react-icons/fi";
import dp from "../assets/dp.webp";

function Dashboard() {
  const { userData } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: userData?.name || "",
    userName: userData?.userName || "",
    email: userData?.email || "",
    bio: userData?.bio || ""
  });

  const handleSave = () => {
    console.log("Saving data:", editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: userData?.name || "",
      userName: userData?.userName || "",
      email: userData?.email || "",
      bio: userData?.bio || ""
    });
    setIsEditing(false);
  };

  const StatCard = ({ title, value, icon: Icon, accent = false }) => (
    <div className={`relative overflow-hidden rounded-xl p-6 ${accent ? 'bg-white text-black' : 'bg-black border-2 border-white'} hover:scale-105 transition-transform duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <Icon size={24} className={accent ? 'text-black' : 'text-white'} />
        <div className={`w-2 h-2 rounded-full ${accent ? 'bg-black' : 'bg-white'}`}></div>
      </div>
      <h3 className={`text-2xl font-bold mb-1 ${accent ? 'text-black' : 'text-white'}`}>{value}</h3>
      <p className={`text-sm ${accent ? 'text-gray-700' : 'text-gray-400'}`}>{title}</p>
    </div>
  );

  const EditableField = ({ icon: Icon, label, value, field, type = "text", multiline = false }) => (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-300 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <div className="relative bg-black border-2 border-white rounded-xl p-6 hover:border-gray-300 transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg">
              <Icon className="text-black" size={18} />
            </div>
            <h3 className="text-lg font-semibold text-white">{label}</h3>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-black border border-white rounded-lg text-white hover:bg-white hover:text-black transition-all duration-200"
            >
              <FiEdit3 size={16} />
            </button>
          )}
        </div>
        
        {isEditing ? (
          multiline ? (
            <textarea
              value={editData[field]}
              onChange={(e) => setEditData({...editData, [field]: e.target.value})}
              className="w-full p-4 bg-gray-900 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white outline-none resize-none"
              rows="4"
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
          ) : (
            <input
              type={type}
              value={editData[field]}
              onChange={(e) => setEditData({...editData, [field]: e.target.value})}
              className="w-full p-4 bg-gray-900 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white outline-none"
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
          )
        ) : (
          <div className="min-h-[60px] flex items-center">
            {value ? (
              <p className="text-gray-300 text-base leading-relaxed break-words">{value}</p>
            ) : (
              <p className="text-gray-500 italic">Click edit to add {label.toLowerCase()}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Welcome back, {userData?.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-xl text-gray-400">Manage your Mental Mate profile</p>
          </div>
          
          {isEditing && (
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-8 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 shadow-lg"
              >
                <FiCheck size={20} />
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-8 py-3 bg-black border-2 border-white text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-200"
              >
                <FiX size={20} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Account Status"
            value={userData?.isOtpVerified ? "Verified" : "Pending"}
            icon={FiShield}
            accent={userData?.isOtpVerified}
          />
          <StatCard
            title="Member Since"
            value={userData?.createdAt ? new Date(userData.createdAt).getFullYear() : "2025"}
            icon={FiCalendar}
          />
          <StatCard
            title="Profile Complete"
            value={`${Math.round(([userData?.name, userData?.email, userData?.bio, userData?.profileImage].filter(Boolean).length / 4) * 100)}%`}
            icon={FiUser}
          />
          <StatCard
            title="Last Active"
            value="Today"
            icon={FiClock}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Profile Image Section */}
          <div className="xl:col-span-1">
            <div className="bg-black border-2 border-white rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center justify-center space-x-2">
                <FiCamera size={20} />
                <span>Profile Picture</span>
              </h3>
              
              <div className="relative inline-block group mb-6">
                <img
                  src={userData?.profileImage || dp}
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-4 border-white shadow-2xl object-cover mx-auto"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <div className="text-center">
                    <FiCamera className="text-white mx-auto mb-2" size={24} />
                    <p className="text-white text-sm font-medium">Change Photo</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Profile Visibility</p>
                  <p className="text-white font-medium">Private</p>
                </div>
                
                <button className="w-full px-6 py-3 bg-black border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-200">
                  <FiSettings className="inline mr-2" size={18} />
                  Account Settings
                </button>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="xl:col-span-2 space-y-6">
            <EditableField
              icon={FiUser}
              label="Full Name"
              value={userData?.name}
              field="name"
            />
            
            <EditableField
              icon={FiUser}
              label="Username"
              value={userData?.userName}
              field="userName"
            />
            
            <EditableField
              icon={FiMail}
              label="Email Address"
              value={userData?.email}
              field="email"
              type="email"
            />
            
            <EditableField
              icon={FiEdit3}
              label="Bio"
              value={userData?.bio}
              field="bio"
              multiline={true}
            />
          </div>
        </div>

        {/* Account Timeline */}
        <div className="mt-12 bg-black border-2 border-white rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center space-x-3">
            <div className="p-2 bg-white rounded-lg">
              <FiCalendar className="text-black" size={20} />
            </div>
            <span>Account Timeline</span>
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-6 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="w-4 h-4 bg-white rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-white font-semibold">Account Created</p>
                <p className="text-gray-400 text-sm">
                  {userData?.createdAt 
                    ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : "Welcome to Mental Mate!"
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className={`w-4 h-4 rounded-full flex-shrink-0 ${userData?.isOtpVerified ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <div className="flex-1">
                <p className="text-white font-semibold">
                  {userData?.isOtpVerified ? 'Email Verified' : 'Email Verification Pending'}
                </p>
                <p className="text-gray-400 text-sm">
                  {userData?.isOtpVerified 
                    ? 'Your email has been successfully verified'
                    : 'Please check your email for verification link'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 p-6 bg-gray-900 rounded-xl border border-gray-700">
              <div className="w-4 h-4 bg-blue-400 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-white font-semibold">Last Profile Update</p>
                <p className="text-gray-400 text-sm">
                  {userData?.updatedAt 
                    ? new Date(userData.updatedAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : "Keep your profile up to date"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;