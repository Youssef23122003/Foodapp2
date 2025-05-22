import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import Navbar from '../Navbar/Navbar'

export default function MasterLayout({userName}) {
  return (
    <>
      <div className='d-flex'>
        <div className="">
          <SideBar/>
        </div>
        <div className="w-100">
          <Navbar userName={userName}/>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
