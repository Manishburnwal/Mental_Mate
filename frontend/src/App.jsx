import React from 'react'
import SignUp from './components/SignUp'
import { ToastContainer } from 'react-toastify'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Selection from './pages/Selection'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'

export const serverUrl = "https://mental-mate.onrender.com"

function App() {
  const {userData} = useSelector(state=>state.user)
  getCurrentUser()
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/selection' element={userData ? <Selection/> : <Navigate to={"/login"}/>}/>
      <Route path='/chat' element={userData ? <Chat/> : <Navigate to={"/login"}/>}/>
      <Route path='/signup' element={!userData ? <SignUp/> : <Navigate to={"/"}/>}/>
      <Route path='/login' element={!userData ? <Login/> : <Navigate to={"/"}/>}/>
    </Routes>
    </>
  )
}

export default App
