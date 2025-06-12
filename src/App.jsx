import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPass from './modules/Authentication/components/Forget-pass/ForgetPass'
import Register from './modules/Authentication/components/Register/Register'
import MasterLayout from './modules/Shared/components/MasterLayout/MasterLayout'
import Notfound from './modules/Shared/components/Notfound/Notfound'
import AuthLayout from './modules/Shared/components/AuthLayout/AuthLayout'
import FavList from './modules/Favourites/components/FavList/FavList'
import RecipeData from './modules/Recipes/components/RecipeData/RecipeData'
import RecipesList from './modules/Recipes/components/RecipesList/RecipesList'
import Dashboard from './modules/Dashboard/components/Dashboard/Dashboard'
import ResetPass from './modules/Authentication/components/Reset-pass/ResetPass'
import VerifiyAccount from './modules/Authentication/components/Verifiy-account/VerifiyAccount'
import Login from './modules/Authentication/components/Login/Login'
import CategoriesList from './modules/Catagories/components/CategoriesList/CategoriesList'
import CategoryData from './modules/Catagories/components/CategoryData/CategoryData'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UsersList from './modules/Users/components/UsersList/UsersList';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './modules/Shared/components/ProtectedRoute/ProtectedRoute';
import { axiousInstance, USERS_URLS } from './services/Urls';
import Profile from './modules/Shared/components/Profile/Profile';

function App() {
  const routes=createBrowserRouter([{
    path:'',
    element:<AuthLayout/>,
    errorElement:<Notfound/>,
    children:[
      {index:true, element:<Login/>},
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
      {path:'reset-pass', element:<ResetPass/>},
      {path:'verifiy-account', element:<VerifiyAccount/>},
      {path:'forget-pass', element:<ForgetPass/>}
    ]
  },
  {
    path:'/dashboard',
    element: <ProtectedRoute><MasterLayout/></ProtectedRoute>,
    errorElement:<Notfound/>,
    children:[
      {index : true , element:<Dashboard/>},
      {path: 'recipes' , element:<RecipesList/>},
      {path: 'recipe-data' , element:<RecipeData/>},
      {path: 'favlist' , element:<FavList/>},
      {path: 'categories' , element:<CategoriesList/>},
      {path: 'category-data' , element:<CategoryData/>},
      {path: 'profile' , element:<Profile/>},
      {path: 'users' , element:<UsersList/>},
      {path: 'favs' , element:<FavList/>}
    ]
  }])

 

  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    </>
  )
}

export default App
