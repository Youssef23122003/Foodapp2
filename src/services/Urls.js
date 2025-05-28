import axios from "axios"

const baseURL = 'https://upskilling-egypt.com:3006/api/v1'
export const baseImgURL = 'https://upskilling-egypt.com:3006/'

export const axiousInstance = axios.create({baseURL,headers:{ Authorization: localStorage.getItem('token') }})


export const USERS_URLS = {
    LOGIN:'/Users/Login',
    RESET_PASS:'/Users/Reset',
    FORGET_PASS:'/Users/Reset/Request',
    VERIFIY_ACC:'/Users/verify',
    CHANGE_PASS:'/Users/ChangePassword'
}

export const CATEGORY_URLS = {
    GET_ALL_GATEGORIES:'/Category/',
    GET_SPECIFIC_GATEGORY:(id)=>`/Category/${id}`,
    DELETE_CATEGORY:(id)=>`/Category/${id}`,
    UPDATE_CATEGORY:(id)=>`/Category/${id}`
}

export const RECIPES_URL = {
    GET_ALL_RECIPES:'/Recipe/',
    ADD_RECIPE:'/Recipe/',
    GET_SPECIFIC_RECIPE:(id)=>`/Recipe/${id}`,
    DELETE_Recipe:(id)=>`/Recipe/${id}`,
    UPDATE_Recipe:(id)=>`/Recipe/${id}`
}

export const TAGS_URL = {
    GET_ALL_TAGS : '/tag/'
}
