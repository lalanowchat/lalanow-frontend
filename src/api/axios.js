import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://lalanow-backend-prod.onrender.com',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
  }
})

export default axiosInstance;
