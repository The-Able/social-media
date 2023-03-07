import axios from 'axios'

const API = axios.create({baseURL: "http://social-media-inky.vercel.app/api/v1"})


export const userChats = id => API.get(`/chat/${id}`)