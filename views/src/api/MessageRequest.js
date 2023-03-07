import axios from 'axios'

const API = axios.create({baseURL: "http://social-media-inky.vercel.app/api/v1"})


export const getMessages = id => API.get(`/message/${id}`)
export const addMessage = data => API.post(`/message/`,data)