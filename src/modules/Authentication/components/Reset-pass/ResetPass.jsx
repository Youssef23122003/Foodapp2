import React, { useState } from 'react'
import logo from '../../../../assets/images/4 3.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Bg from '../../../../assets/images/ella-olsson-C1Q3qOTlegg-unsplash 1.png'

export default function ResetPass() {
   const navigate=useNavigate()
   const [isLoading, setIsLoading] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  let {register,formState:{errors},handleSubmit,watch} = useForm()
  const password = watch('password')
  const onSubmit = async (data) =>{
    setIsLoading(true)
    console.log(data);
    try{
      const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset',data)
      console.log(response.data);
        toast.success(response.data.message)
        navigate('/')
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
         backgroundImage: `url(${Bg})`
       }} className="auth-container">
          <div className="container-fluid bg-overlay">
            <div className="row vh-100 justify-content-center align-items-center">
              <div className="col-md-5 bg-white rounded-3 px-5 py-4">
                <div>
                  <div className="logo-container text-center">
                    <img className='w-50' src={logo} alt="food-logo" />
                  </div>
                  <div className="title my-3">
                    <h5>Reset  Password</h5>
                    <span className="text-muted">Please Enter Your Otp  or Check Your Inbox</span>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3" id="basic-addon1">
                      <span className="input-group-text">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                      </span>
                      <input
                        {...register('email',{
                          required:'Email is required',
                          pattern:{
                            value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                            message:'The Email Is Not Valid , Please Enter A Valid Email'
                          }
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {errors.email && <span className='text-danger d-block mb-2'>{errors.email.message}</span>}

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                      </span>
                      <input
                        {...register('seed',{
                          required: 'OTP is required',
                          maxLength: {
                            value: 4,
                            message: 'OTP must be 4 characters'
                          },
                          minLength: {
                            value: 2,
                            message: 'OTP must be at least 2 characters'
                          }
                        })}
                        type="string"
                        className="form-control"
                        placeholder="OTP"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {errors.seed && <span className='text-danger d-block mb-2'>{errors.seed.message}</span>}

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                      </span>
                      <input
                         {...register('password', {
                            required: 'Password is required',
                            minLength: {
                              value: 8,
                              message: 'Password must be at least 8 characters'
                            },
                            pattern: {
                              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                              message: 'Password must contain at least 1 uppercase letter, 1 number, and 1 special character'
                            }
                        })}
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    {errors.password && <span className='text-danger d-block mb-2'>{errors.password.message}</span>}

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                      </span>
                      <input
                        {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: value => value === password || 'Passwords do not match'
                        })}
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm New Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    {errors.confirmPassword && <span className='text-danger d-block mb-2'>{errors.confirmPassword.message}</span>}
                    
                    <button className='btn btn-success w-100' disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Loading...
                        </>
                      ) : (
                        'Reset Password'
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
