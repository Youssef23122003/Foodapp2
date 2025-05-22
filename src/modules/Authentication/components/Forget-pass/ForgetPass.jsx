import React, { useState } from 'react'
import logo from '../../../../assets/images/4 3.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Bg from '../../../../assets/images/ella-olsson-C1Q3qOTlegg-unsplash 1.png'


export default function ForgetPass() {
   const navigate=useNavigate()
   const [isLoading, setIsLoading] = useState(false)
   let {register,formState:{errors},handleSubmit} = useForm()
  const onSubmit = async (data) =>{
    setIsLoading(true)
    console.log(data);
    try{
      const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data)
      console.log(response.data);
      toast.success(response.data.message)
      navigate('/reset-pass')
    }
    catch(error){
      console.log(error);
      toast.error(error?.response?.data?.message)
    }
    finally {
      setIsLoading(false)
    }
    
  }
  return (
    <>
    <div style={{
        backgroundImage: `url(${Bg})`}} className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white rounded-3 px-5 py-4">
            <div>
              <div className="logo-container text-center">
                <img className='w-50' src={logo} alt="food-logo" />
              </div>
              <div className="title my-3">
                <h5>Forgot Your Password?</h5>
                <span className="text-muted">No worries! Please enter your email and we will send a password reset link </span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mt-5" id="basic-addon1">
                  <span className="input-group-text">
                     <i class="fa-solid fa-mobile"></i>
                  </span>
                  <input
                    {...register('email',{required:'Email is reqiured',pattern:{value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,message:
                      'The Email Is Not Valid , Please Enter A Vaild Email'
                    }})}
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.email&&<span className='text-danger mb-5'>{errors.email.message}</span>}
                
               
                <button className='btn btn-success mt-5 w-100' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Loading...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
             </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
