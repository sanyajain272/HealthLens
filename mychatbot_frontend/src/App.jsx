import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'   // ✅ Added chatbot import

function App() {
  return (
    <div className='mx-4 sm:mx-[10%] relative'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/profile' element={<MyProfile />} />
      </Routes>
      <Footer />
      <Chatbot />   {/* ✅ Added chatbot at bottom right */}
    </div>
  )
}

export default App
