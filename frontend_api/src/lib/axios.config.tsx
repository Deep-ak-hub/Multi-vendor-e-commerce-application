import axios from 'axios'
import { AppConfig } from '../config/app.config'

const axiosInstance = axios.create({
    baseURL: AppConfig.apiBaseUrl,
    timeout: 60000,          // usually 30 seconds but for onrender server using 60 seconds
    timeoutErrorMessage: "Server Time Out.....",
    responseType: 'json',
    responseEncoding: "UTF-8",
    headers: {
        "Content-Type": "application/json"
    }
})

// TODO- Interceptors

export default axiosInstance