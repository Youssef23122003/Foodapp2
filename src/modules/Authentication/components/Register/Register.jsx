import React, { useState } from 'react'
import logo from '../../../../assets/images/4 3.png'
import Bg from '../../../../assets/images/ella-olsson-C1Q3qOTlegg-unsplash 1.png'
import { useForm } from 'react-hook-form'
import { axiousInstance, USERS_URLS } from '../../../../services/Urls'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  let {register,formState:{errors},handleSubmit,watch} = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const password = watch('password')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  let navigate = useNavigate()
  const handleRegister = async(user) => {
    console.log(user);
    try{
      setIsLoading(true)
      let response = await axiousInstance.post(USERS_URLS.REGISTER,user)
      console.log(response);
      navigate('/verifiy-account')
      toast.success('You are successfully register')
      setIsLoading(false)
    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.additionalInfo.errors.userName[0])
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
          <div className="col-md-6 bg-white rounded-3 px-5 py-4">
            <div>
              <div className="logo-container text-center">
                <img className='w-50' src={logo} alt="food-logo" />
              </div>
              <div className="title my-3">
                <h5>Register</h5>
                <span className="text-muted">Welcome Back! Please enter your details</span>
              </div>
               <form onSubmit={handleSubmit(handleRegister)}>
              <div className="row">
                <div className="col-12 col-md-6">
                  {/* username input */}
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-circle-user"></i></span>
                    <input {...register('userName', { required: 'UserName is required' })} type="text" className="form-control" placeholder="UserName" />
                  </div>
                  {errors.userName && <p className="text-danger">{errors.userName.message}</p>}

                  {/* country input */}
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-earth-africa"></i></span>
                    <input {...register('country', { required: 'Country is required' })} type="text" className="form-control" placeholder="Country" />
                  </div>
                  {errors.country && <p className="text-danger">{errors.country.message}</p>}

                  {/* password input */}
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa fa-key"></i></span>
                    <input
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-outline-secondary">
                      <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </div>

                <div className="col-12 col-md-6">
                  {/* email input */}
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-envelope"></i></span>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email'
                        }
                      })}
                      type="email"
                      className="form-control"
                      placeholder="Enter your E-mail"
                    />
                  </div>
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}

                  {/* phone number input */}
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-phone"></i></span>
                    <input {...register('phoneNumber', { required: 'Phone Number is required' })} type="tel" className="form-control" placeholder="Phone Number" />
                  </div>
                  {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}

                  {/* confirm password input */}
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa fa-key"></i></span>
                    <input
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === password || 'Passwords do not match'
                      })}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="btn btn-outline-secondary">
                      <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              {/* Dropzone */}
              <div className="register-img mb-3">
                <div className="dropzone text-center p-4 border border-secondary rounded bg-light">
                  <input type="file" className="form-control" />
                  <p className="mb-0 small text-muted">Drag & Drop or Choose an Item Image to Upload</p>
                </div>
              </div>

              {/* Login link */}
              <div className="d-flex justify-content-end mb-3">
                <a href="/login" className="text-decoration-none">Already have an account? Login</a>
              </div>

              {/* Submit button */}
              <button className="btn btn-success w-100" type="submit">
                {isLoading?(
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Loading...
                    </>
                  ) :'Register'}
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
