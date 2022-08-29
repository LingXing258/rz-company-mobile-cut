import axios from 'axios'
const instance = axios.create({
    baseURL: window.baseUrl || import.meta.env.VITE_API_URL
})
export default instance