import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Drashboard from '../Pages/Drashboard'
import About from '../Pages/About'
import ContactUs from '../Pages/ContactUs'
import ForgotPassword from '../Pages/ForgetPassword'
import PrivateRoute from '../Router/PrivateRoute'

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='drashboard' element={<PrivateRoute><Drashboard /></PrivateRoute>} />

        <Route path='about' element={<About />} />
        <Route path='contactus' element={<ContactUs />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />

      </Routes>
    </>
  )
}
