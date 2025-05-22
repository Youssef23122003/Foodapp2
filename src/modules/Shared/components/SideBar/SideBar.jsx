import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import sidebarimg from '../../../../assets/images/3.png'
 

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="sidebar-container vh-100 d-flex">
      <Sidebar collapsed={isCollapsed} className="vh-100 shadow">
        <Menu iconShape="circle">
          <MenuItem onClick={toggleSidebar} className="my-4 sidebar-logo d-flex justify-content-center">
            <img src={sidebarimg} alt="Logo" style={{ width: isCollapsed ? '150px' : '120px', transition: '0.3s' }} />
          </MenuItem>

          <MenuItem icon={<i className="fa fa-home" />} component={<Link to="/dashboard" />}>
            Home
          </MenuItem>

          <MenuItem icon={<i className="fa fa-users" />} component={<Link to="/dashboard/users" />}>
            Users
          </MenuItem>

          <MenuItem icon={<i className="fa-solid fa-utensils" />} component={<Link to="/dashboard/recipes" />}>
            Recipes
          </MenuItem>

          <MenuItem icon={<i className="fa-solid fa-grip" />} component={<Link to="/dashboard/categories" />}>
            Categories
          </MenuItem>

          <MenuItem icon={<i className="fa-solid fa-key" />}>
            Change Password
          </MenuItem>

          <MenuItem icon={<i className="fa-solid fa-right-from-bracket" />}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
