import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Main = () => {
  return (
    <div className='h-screen'>
      <Navbar />
      <Outlet />
      <footer>Footer</footer>
    </div>
  )
}

export default Main