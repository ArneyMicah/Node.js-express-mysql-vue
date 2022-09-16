import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:3000',
})
instance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        alert(error)
    }
)
instance.interceptors.response.use(
    (result) => {
        return result.data
    },
    (error) => {
        alert(error)
    }
)
export default instance