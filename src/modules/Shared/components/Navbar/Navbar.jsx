import React from 'react'
import { Link } from 'react-router-dom'
import userimg from '../../../../assets/images/Ellipse 235.png'

export default function Navbar({userName}) {
  return (
   <>
   <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid gap-2 d-felx align-items-center">
        <div class="input-group">
             <span class="input-group-text" id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></span>
            <input type="text" className="form-control" placeholder="Search Here" aria-label="Username" aria-describedby="basic-addon1" />
        </div>

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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item gap-1 d-flex align-items-center">
              <img className='w-50 md:w-25' src={userimg} alt="" srcset="" />
              <span>{userName}</span>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
   
   
   </>
  )
}
