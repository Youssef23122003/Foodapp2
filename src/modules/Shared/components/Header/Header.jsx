import React from 'react'
import imgo from '../../../../assets/images/WhatsApp\ Image\ 2025-05-24\ at\ 14.06.09_0eefaf07.jpg'

export default function Header({title,description,img}) {
 

  return (
    <>
    <div  style={{
            backgroundImage: `url(${imgo})`}}  className="container-fluid header rounded-2">
      <div className="row">
        <div className="col-md-8 d-flex align-items-center">
          <div>
             <h1 className='text-white fw-bold'>{title}</h1>
             <p className='text-white'>{description}</p>
          </div>
          
        </div>
        <div className="col-md-4 d-flex justify-content-end">
         <img className='my-img-animation' src={img} alt="" srcset="" />
        </div>
      </div>
    </div>
    </>
  )
}
