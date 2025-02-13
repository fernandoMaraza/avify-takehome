import axios from "axios";

const api = axios.create({
    baseURL:'https://api.carbonintensity.org.uk/'
})
api.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json'
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
)
api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  
  export default api