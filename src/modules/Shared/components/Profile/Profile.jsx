import React, { use, useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import header from '../../../../assets/images/header.png';
import { useForm } from 'react-hook-form';
import { axiousInstance, baseImgURL, USERS_URLS } from '../../../../services/Urls';
import { toast } from 'react-toastify';
import defaultImage from '../../../../assets/images/user-profile-icon-vector-avatar-600nw-2247726673.webp'
export default function Profile() {
   
    let {register,formState:{errors},handleSubmit,setValue} = useForm()
    let [showPassword,setShowPassword] = useState(false)
    let [currentUser,setCurrentUser] = useState(null)
    let [isLoading,setIsLoading] = useState(false)

    const getProfileData = async()=>{
        try{
            let response = await axiousInstance(USERS_URLS.CURRENT_USER)
            console.log(response.data);
            setCurrentUser(response.data)
        }
        catch(error){
            console.log(error);
            
        }
    }

    useEffect(()=>{getProfileData()},[])
    
    useEffect(()=>{if(currentUser){
        setValue('userName',currentUser.userName)
        setValue('email',currentUser.email)
        setValue('country',currentUser.country)
        setValue('phoneNumber',currentUser.phoneNumber)
    }},[currentUser,currentUser?.imagePath])



    const submitProfile = async(profileData)=> {
       try{
        setIsLoading(true)
         let response = await axiousInstance.put(USERS_URLS.UPDATE_PROFILE,profileData)
         console.log(response);
         toast.success('Account is successfully updated')
         setIsLoading(false)
       }
       catch(error){
        console.log(error);
        toast.error(error)
        setIsLoading(false)
       }
    }

   

  return (
    <>
    <Header title={'My Profile'} description={''} img={header}/>
      


      <div className="container profile mt-3">
  <div className="row">
    <div className="col-md-8 m-auto">
        
        <img className='w-25 text-center d-flex m-auto mb-2' src={currentUser?.imagePath?`${baseImgURL}${currentUser.imagePath}`:defaultImage} alt="" srcset="" />
      <form onSubmit={handleSubmit(submitProfile)}>
       
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text h-100">
              <i className="fa-solid fa-user"></i>
            </span>
          </div>
          <input {...register('userName',{required:'UserName is reqiured'})} type="text" className="form-control" placeholder="Enter your Name" />
        </div>
        {errors.userName && <p className='text-danger'>{errors.userName.message}</p>}

        {/* البريد */}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text h-100">
              <i className="fa-solid fa-mobile-screen"></i>
            </span>
          </div>
          <input {...register('email',{required:'Email is Required'})} type="text" className="form-control" placeholder="Enter your Email" />
        </div>
        {errors.email && <p className='text-danger'>{errors.email.message}</p>}

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text h-100">
              <i className="fa-solid fa-earth-africa"></i>
            </span>
          </div>
         <input {...register('country',{required:'Country is Required'})} type="text" className="form-control" placeholder="Enter your Country" />
        </div>
        {errors.country && <p className='text-danger'>{errors.country.message}</p>}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text h-100">
              <i className="fa-solid fa-mobile-screen"></i>
            </span>
          </div>
         <input {...register('phoneNumber',{required:'Phone Number is Required'})} type="text" className="form-control" placeholder="Enter your Phone Number" />
        </div>
        {errors.phoneNumber && <p className='text-danger'>{errors.phoneNumber.message}</p>}

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text h-100">
              <i className="fa-solid fa-lock"></i>
            </span>
          </div>
           <input {...register('confirmPassword',{required:'confirmPassword is Required'})} type={showPassword?'text':'password'} className="form-control" placeholder="Enter your Confirm Password" />
          <span onClick={()=>setShowPassword(!showPassword)} className="btn btn-outline-secondary border-start-0">
            <i  className={showPassword?"fa-solid fa-eye-slash":'fa-solid fa-eye'}></i>
          </span>
        </div>
         {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
        <button className="btn-add btn text-white  w-100 px-2 py-2 mb-3">
          {isLoading? (<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                     ):('Update Profile')}
        </button>
      </form>
    </div>
  </div>
</div>
    </>
  )
}
