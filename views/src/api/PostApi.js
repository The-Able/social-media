import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:8080"})

export const getTimelinePosts = (id) => API.post(`/posts/${id}/timeline`)

