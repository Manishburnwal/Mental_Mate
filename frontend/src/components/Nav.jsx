import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/man.jpg"

function Nav() {
  const { userData } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const NavButton = ({ onClick, icon: Icon, children, variant = "primary" }) => {
    const baseClasses = "flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-2xl transition-all duration-200";
    const variants = {
      primary: "text-white bg-black border-2 border-white hover:bg-white hover:text-black",
      secondary: "text-white hover:bg-gray-800"
    };
    
    return (
      <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
        {Icon && <Icon size={18} />}
        <span>{children}</span>
      </button>
    );
  };

  const UserProfile = ({ mobile = false }) => (
    <div className={`flex items-center space-x-3 ${mobile ? 'px-3 py-2' : ''}`}>
      <div className={mobile ? '' : 'text-right'}>
        <p className="text-sm font-medium text-white">{userData?.name || "User"}</p>
        <p className="text-xs text-gray-400">Online</p>
      </div>
    </div>
  );

  return (
    <nav className="w-full h-16 bg-black fixed top-0 shadow-lg z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
          <img src={logo} alt="" className="w-12 h-12 rounded-full border-2 border-white"/>
            <div className="hidden sm:block">
              
              <h1 className="text-xl font-semibold text-white">Mental<span className="text-white">Mate</span></h1>
              <p className="text-xs text-gray-400 -mt-1">Your AI Companion</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {userData ? (
              <>
                <UserProfile />
                <NavButton onClick={handleLogout} icon={FiLogOut}>Logout</NavButton>
              </>
            ) : (
              <>
                <NavButton onClick={() => navigate("/login")}>Get Started</NavButton>
              </>
            )}
          </div>

       
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-gray-800 transition-colors duration-200"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 py-3 space-y-3">
          {userData ? (
            <>
              <UserProfile mobile />
              <hr className="border-gray-800" />
              <NavButton onClick={handleLogout} icon={FiLogOut} variant="secondary">Logout</NavButton>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3 px-3 py-2">
                <span className="text-sm text-gray-400">Not signed in</span>
              </div>
              <hr className="border-gray-800" />
              <NavButton onClick={() => navigate("/login")} variant="secondary">Get Started</NavButton>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;