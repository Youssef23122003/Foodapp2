import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import Bg from '../../../../assets/images/ella-olsson-C1Q3qOTlegg-unsplash 1.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import logo from '../../../../assets/images/4 3.png'
import { axiousInstance, USERS_URLS } from '../../../../services/Urls';


export default function VerifiyAccount() {
   const navigate=useNavigate()
   let {register,formState:{errors},handleSubmit,watch} = useForm()
   const [isLoading, setIsLoading] = useState(false)

  const verifyAcc = async (account)=>{
    try{
      console.log(account);
      setIsLoading(true)
      let response = await axiousInstance.post(USERS_URLS.VERIFIY_ACC,account)
      console.log(response);
      toast.success('Account is Verfied Successfully')
      navigate('/')
    }
    catch(error){
      console.log(error);
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
                      <h5>Verfiy Account</h5>
                      <span className="text-muted">Please Enter Your Otp  or Check Your Inbox</span>
                    </div>
                    <form onSubmit={handleSubmit(verifyAcc)}>
                      <div className="input-group mt-3" id="basic-addon1">
                        <span className="input-group-text">
                           <i class="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                        <input  
                          {...register('email',{required:'Email Is Required'})} 
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          aria-label="Email"
                          aria-describedby="basic-addon1"
                        />
                      </div> 
                      {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                      <div className="input-group mt-3" id="basic-addon1">
                        <span className="input-group-text">
                           <i class="fa fa-lock" aria-hidden="true"></i>
                        </span>
                        <input   
                          {...register('code',{required:'OTP is required'})}
                          type="text"
                          className="form-control"
                          placeholder="OTP"
                          aria-label="OTP"
                          aria-describedby="basic-addon1"
                        />
                      </div> 
                      {errors.code && <p className='text-danger'>{errors.code.message}</p>}
                      <button className='btn btn-success mt-5 w-100' disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Loading...
                          </>
                        ) : (
                          'Send'
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
