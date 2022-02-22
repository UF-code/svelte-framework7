import axios from 'axios'

const axiosBaseURI = axios.create({
    baseURL: `http://localhost:5001/api/customers`,
})

export default axiosBaseURI
