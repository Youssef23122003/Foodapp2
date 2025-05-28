import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import sidebarimg from '../../../../assets/images/3.png'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from '../../../../assets/images/4 3.png'
import { useForm } from 'react-hook-form';
import { axiousInstance, USERS_URLS } from '../../../../services/Urls';
import { toast } from 'react-toastify';


export default function SideBar() {
  let {register,formState:{errors},handleSubmit,watch} = useForm()
  const [isCollapsed, setIsCollapsed] = useState(false)
  let navigate = useNavigate()
   const newPassword = watch('newPassword')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [lgShow, setLgShow] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/'); 
    toast.success('You have been logged out');
  }


  const changeOldPassword = async (changePassword)=>{
      try{
         setIsLoading(true)
         console.log(changePassword);
          let response = await axiousInstance.put(USERS_URLS.CHANGE_PASS,changePassword)
          console.log(response);
          toast.success('Password is successfully Updated')  
          setIsLoading(false)  
          setLgShow(false)
      }
      catch(error){
        console.log(error);
        setIsLoading(false)
      }
  }

  return (
    <>
    <div className="sidebar-container vh-100 d-flex">
      <Sidebar
        style={{
          borderTopRightRadius: '70px',
          overflow: 'hidden',
        }}
        collapsed={isCollapsed}
        className="vh-100 border-rounded-end-2 shadow"
      >
        <Menu iconShape="circle">
          <MenuItem onClick={toggleSidebar} className="my-4 sidebar-logo d-flex justify-content-center">
            <img
              src={sidebarimg}
              alt="Logo"
              style={{ width: isCollapsed ? '150px' : '120px', transition: '0.3s' }}
            />
          </MenuItem>

          <MenuItem
            icon={<i className="fa fa-home" />}
            component={<NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''} end />}
          >
            Home
          </MenuItem>

          <MenuItem
            icon={<i className="fa fa-users" />}
            component={<NavLink to="/dashboard/users" className={({ isActive }) => isActive ? 'active' : ''} />}
          >
            Users
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-utensils" />}
            component={<NavLink to="/dashboard/recipes" className={({ isActive }) => isActive ? 'active' : ''} />}
          >
            Recipes
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-grip" />}
            component={<NavLink to="/dashboard/categories" className={({ isActive }) => isActive ? 'active' : ''} />}
          >
            Categories
          </MenuItem>

          <MenuItem onClick={() => setLgShow(true)} icon={<i className="fa-solid fa-key" />}>
            Change Password
          </MenuItem>

          <MenuItem onClick={logout} icon={<i className="fa-solid fa-right-from-bracket" />}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>

         <Modal
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
       
          <Modal.Title className='d-flex justify-content-center' id="example-modal-sizes-title-lg">
           <img className={'w-50'} src={logo} alt="" srcset="" />
          </Modal.Title>
        
        <Modal.Body>
           <form onSubmit={handleSubmit(changeOldPassword)}>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                      </span>
                      <input
                        {...register('oldPassword', {
                          required: 'Old Password is required',
                          minLength: {
                            value: 6,
                            message:  "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
                          }
                        })}
                        type={showPassword?'text':'password'}
                        className="form-control"
                        placeholder="Old Password"
                        aria-label="Old Password"
                        aria-describedby="basic-addon1"
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={showPassword?'fa-solid fa-eye-slash':'fa-solid fa-eye'}></i>
                      </button>
                    </div>
                    {errors.oldPassword && <span className='text-danger d-block mb-2'>{errors.oldPassword.message}</span>}

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                      </span>
                      <input
                        {...register('newPassword', {
                          required: 'New Password is required',
                          minLength: {
                            value: 6,
                            message:  "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
                          }
                        })}
                        type={showPassword?'text':'password'}
                        className="form-control"
                        placeholder="New Password"
                        aria-label="New Password"
                        aria-describedby="basic-addon1"
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={showPassword?'fa-solid fa-eye-slash':'fa-solid fa-eye'}></i>
                      </button>
                    </div>
                    {errors.newPassword && <span className='text-danger d-block mb-2'>{errors.newPassword.message}</span>}

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-lock" aria-hidden="true"></i>
                      </span>
                      <input
                        {...register('confirmNewPassword', {
                          required: 'Please confirm your password',
                          validate: value => value === newPassword || 'Passwords do not match'
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
                    {errors.confirmNewPassword && <span className='text-danger d-block mb-2'>{errors.confirmNewPassword.message}</span>}
                    
                    <button className='btn btn-success w-100' disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Loading...
                        </>
                      ) : (
                        'Update Password'
                      )}
                    </button>
                 </form>
        </Modal.Body>
      </Modal>
 </>
   
  )
}
