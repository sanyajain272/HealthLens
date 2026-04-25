import React from 'react'
import Header from '../components/header'
import Speciality_Menu from '../components/Speciality_Menu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
const Home = () => {
  return (
    <div>
      <Header/>
      <Speciality_Menu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home
