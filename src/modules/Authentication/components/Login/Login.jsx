import React, { useContext, useState } from 'react'
import logo from '../../../../assets/images/4 3.png'
import Bg from '../../../../assets/images/ella-olsson-C1Q3qOTlegg-unsplash 1.png'
import { Link, useNavigate } from 'react-router-dom'
import { set, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../../context/AuthContext'


export default function Login() {
  let {saveLogingData} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate=useNavigate()
  let {register,formState:{errors},handleSubmit} = useForm()
  const onSubmit = async (data) =>{
    setIsLoading(true)
    console.log(data);
    try{
      const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data)
      console.log(response);
      console.log(response.data);
      localStorage.setItem('token',response?.data?.token)
      saveLogingData()
      toast.success('Successfully Signed in')
      navigate('/dashboard')
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
    <div  style={{
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
                <h5>Log In</h5>
                <span className="text-muted">Welcome Back! Please enter your details</span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3" id="basic-addon1">
                  <span className="input-group-text">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
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
                {errors.email && <span className='text-danger d-block mb-2'>{errors.email.message}</span>}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    aria-label="password"
                    aria-describedby="basic-addon1"
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye' }`}></i>
                  </button>
                </div>
                {errors.password && <span className='text-danger d-block mb-2'>{errors.password.message}</span>}
                <div className="links d-flex justify-content-between mb-3">
                  <Link className='text-black text-decoration-none' to={'/register'}>Register</Link>
                  <Link className='text-success text-decoration-none' to={'/forget-pass'}>Forget Password</Link>
                </div>
                <button className='btn btn-success w-100' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Loading...
                    </>
                  ) : (
                    'Login'
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
