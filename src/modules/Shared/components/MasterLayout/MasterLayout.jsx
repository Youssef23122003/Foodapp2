import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import Navbar from '../Navbar/Navbar'

export default function MasterLayout() {
  return (
    <>
      <div className='d-flex'>
        <div className="vh-100 position-sticky top-0">
          <SideBar/>
        </div>
        <div className="w-100 position-relative">
          <Navbar/>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
