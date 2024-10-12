import React from 'react'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
function Home() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Home