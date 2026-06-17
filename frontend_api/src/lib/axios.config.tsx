import axios, { AxiosError } from "axios";
import { AppConfig } from "../config/app.config";

export interface ApiErrorResponse {
    message?: string;
    error?: Record<string, string>;
    status?: string;
}

export interface ApiError {
  message?: string;
  status?: number;
  fieldErrors?: Record<string, string>;
  errorCode?: string; 
}

const axiosInstance = axios.create({
  baseURL: AppConfig.apiBaseUrl,
  timeout: 1200000, // usually 30 seconds but for onrender server using 120 seconds
  timeoutErrorMessage: "Server Time Out.....",
  responseType: "json",
  responseEncoding: "UTF-8",
  headers: {
    "Content-Type": "application/json",
  },
});

// API call

// UI Component ------> AxiosConfig ------> Interceptors ------> internet(network)
// Server Response ------> Interceptors ------> UI Component

// Response Interceptor for Error Handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (exception: AxiosError<ApiErrorResponse>) => {
    // Extract error message from server response
    const errorData = exception.response?.data;
    const fieldErrors = errorData?.error;

    let message =
      errorData?.message ||
      exception.response?.statusText ||
      exception.message ||
      "Something went wrong. Please try again.";

      if (fieldErrors && Object.keys(fieldErrors).length > 0) {
            message = Object.values(fieldErrors)[0];
        }
    const normalizedError: ApiError = {
      message,
      status: exception.response?.status,
      fieldErrors,
      errorCode: errorData?.status
    };
    return Promise.reject(normalizedError);
  },
);

export default axiosInstance;
