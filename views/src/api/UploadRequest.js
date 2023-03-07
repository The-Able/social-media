import axios from 'axios'

const API = axios.create({baseURL: "http://social-media-inky.vercel.app/api/v1"})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const uploadImage = data => API.post('/upload', data)

export const uploadPost = data => API.post('/posts', data)