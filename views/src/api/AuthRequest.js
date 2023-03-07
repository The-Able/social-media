import axios from 'axios'

const API = axios.create({baseURL: "http://social-media-inky.vercel.app/api/v1"})

export const logIn = (formData) => API.post('/auth/login', formData)
export const signUp = (formData) => API.post('/auth/register', formData)