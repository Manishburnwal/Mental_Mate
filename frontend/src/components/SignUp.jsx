import React, { useState } from 'react'
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import brain from "../assets/man.jpg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';


function SignUp() {
    const [show,setShow] = useState(false)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [userName,setUserName] = useState("")
    const [loading, setLoading] = useState(false) 
    const dispatch = useDispatch()  

    const handleSignUp = async()=>{
        setLoading(true)
        try {
            const result = await axios.post(serverUrl+"/api/auth/signup",{name,userName,email,password},{withCredentials:true})
            dispatch(setUserData(result.data))
            setLoading(false)
            toast.success("SignUp Successful")  
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }


  return (
    <div className='bg-[#e1e4e7] w-[100vw] h-[100vh] flex items-center justify-center'>
      <form className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex' onSubmit={(e)=>e.preventDefault()}>
        {/* left Div */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
            <div>
                <h1 className='font-semibold text-black text-2xl'>Let's get started</h1>
                <h2 className='text-[#999797] text-[18px]'>Create Your Account</h2>
            </div>
            <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                <label htmlFor="name" className='font-semibold'>Name</label>
                <input id='name' type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] rounded-xl focus:outline-none focus:border-2 focus:border-black' placeholder='Your Name' onChange={(e)=>setName(e.target.value)} value={name}/>
            </div>
            <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                <label htmlFor="uname" className='font-semibold'>userName</label>
                <input id='uname' type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] rounded-xl focus:outline-none focus:border-2 focus:border-black' placeholder='Your UserName' onChange={(e)=>setUserName(e.target.value)} value={userName}/>
            </div>
            <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                <label htmlFor="email" className='font-semibold'>Email</label>
                <input id='email' type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] rounded-xl focus:outline-none focus:border-2 focus:border-black' placeholder='Your Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </div>
            <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                <input id='password' type={show?"text":"password"} className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] rounded-xl px-[20px] focus:outline-none focus:border-2 focus:border-black'
                onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Your Password'/>
                {show ? <IoEyeSharp className='absolute w-5 h-5 cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow(prev=>!prev)}/> :
                <IoEyeOffSharp className='absolute w-5 h-5 cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow(prev=>!prev)}/>}
            </div>
            <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' onClick={handleSignUp} disabled={loading}>{loading ? <ClipLoader size={30} color='white'/> : "SignUp"}</button>
            <div className='w-[80%] flex items-center gap-2'>
                <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
                <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue</div>
                <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
            </div>
            <div className='text-[#6f6f6f]' onClick={()=>navigate("/login")}>Already have an account? <span className='underline underline-offset-1 text-black cursor-pointer'>Login</span></div>
        </div>

        {/* Ri8 Div */}
        <div className='w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden'>
            <span className='text-5xl text-white'>MENTAL_MATE</span>
            <img src={brain} alt='logo' className='w-100 h-100 object-cover'/> 
        </div>
      </form>
    </div>
  )
}

export default SignUp
