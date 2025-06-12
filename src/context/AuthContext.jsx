import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'

export let AuthContext = createContext(null)

export default function AuthContextProvider(props){

    
  let[loginData,setLoginData]=useState(null)
  let[userName,setUserName]=useState(null)

  const saveLogingData = () =>{
    let encodedtoken = localStorage.getItem('token')
    let decodedToken = jwtDecode(encodedtoken);
    console.log(decodedToken);
    setLoginData(decodedToken)
    setUserName(decodedToken.userName)
  }

   useEffect(()=>{if(localStorage.getItem('token')){saveLogingData()}},[])


    return(<AuthContext.Provider value={{loginData,saveLogingData,userName}}>{props.children}</AuthContext.Provider>)
}
