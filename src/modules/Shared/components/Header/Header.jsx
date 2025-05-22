import React from 'react'
import axios from 'axios'

export default function Header({title,description,img}) {
 

  return (
    <>
    <div className="container-fluid header">
      <div className="row">
        <div className="col-md-8 d-flex align-items-center">
          <div>
             <h1 className='text-white'>{title}</h1>
             <p className='text-white'>{description}</p>
          </div>
          
        </div>
        <div className="col-md-4 d-flex justify-content-end">
         <img src={img} alt="" srcset="" />
        </div>
      </div>
    </div>
    </>
  )
}
