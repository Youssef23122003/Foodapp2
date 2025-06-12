import React, { useContext } from 'react'
import Header from '../../../Shared/components/Header/Header'
import header from '../../../../assets/images/dashimg-header.png'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'

export default function Dashboard() {
  let {userName} = useContext(AuthContext)
  let navigate = useNavigate()
  return (
    <>
      <Header title={`welcome ${userName} !` } description={'This is a welcoming screen for the entry of the application , you can now see the options'} img={header}/>
      <div className="recipe-header p-4">
      <div className="row">
        <div className="col-md-8 d-flex align-items-center">
          <div>
            <h5  className='fw-bold'>Fill the <strong className='fw-bold text-success'>Recipes</strong> !</h5>
            <p>you can now fill the meals easily using the table and form , <br /> click here and sill it with the table !</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-end align-items-center">
          <button onClick={()=>{navigate('/dashboard/recipe-data')}} className="btn btn-success">
            All Recipes <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
