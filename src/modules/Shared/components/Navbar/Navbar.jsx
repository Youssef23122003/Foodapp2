import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import userimg from '../../../../assets/images/Ellipse 235.png'
import { AuthContext } from '../../../../context/AuthContext'

export default function Navbar() {
  let {userName} = useContext(AuthContext)
  return (
   <>
   <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid gap-2 d-felx align-items-center">
        {/* <div class="input-group">
             <span class="input-group-text" id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></span>
            <input type="text" className="form-control" placeholder="Search Here" aria-label="Username" aria-describedby="basic-addon1" />
        </div> */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex align-items-center gap-4 ms-auto mb-2 mb-lg-0">
            <li className="nav-item gap-1 d-flex align-items-center">
             <img className='' src={userimg} alt="" srcset="" />
              <span>{userName}</span>
              
            </li>
            <li>
              <NavLink className={'Logooo'} to={'/dashboard/profile'}>
                <i class="fa fa-user" aria-hidden="true"></i>
                <span>My Profile</span>
             </NavLink>
            </li>
            <li className='position-relative'>
             <i className="fa fa-bell fa-lg"></i>
              <span 
                className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                style={{ width: '10px', height: '10px' }}
              ></span>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
   
   
   </>
  )
}
