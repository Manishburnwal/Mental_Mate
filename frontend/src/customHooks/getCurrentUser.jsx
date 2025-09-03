import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'   
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';

const getCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchUser = async()=>{
        try {
            const result = await axios(serverUrl+"/api/user/getcurrentuser",{withCredentials:true})
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)
            dispatch(setUserData(null))
        }
    }
    fetchUser()
  },[])
}

export default getCurrentUser