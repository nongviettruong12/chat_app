import axios from 'axios'

const axiosService = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
      }, // Truyền cookie dữ liệu cho server
})
export default axiosService
