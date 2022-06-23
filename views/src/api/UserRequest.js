import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:8080"})

export const getUser = (userId) => API.post(`/user/${userId}`)
export const updateUser = (id, formData)=> API.put(`/user/${id}`, formData)