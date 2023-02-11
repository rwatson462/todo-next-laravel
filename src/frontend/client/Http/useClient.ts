import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import useAuth from "../Auth/Hooks/useAuth"

type Client = {
  get: <T>(url: string, config?: {}) => Promise<T>,
  post: <T>(url: string, data?: {}, config?: {}) => Promise<T>,
  put: <T>(url: string, data?: {}, config?: {}) => Promise<T>,
  patch: <T>(url: string, data?: {}, config?: {}) => Promise<T>,
  delete: <T>(url: string, config?: {}) => Promise<T>,
}

export default function useClient(): Client {
  const { logout } = useAuth()

  const client = axios.create({
    baseURL: '/api',
  })

  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        logout()
        console.log('User is logged out')
      }
    }
  )

  return {
    get: <T>(url: string, config = {}) => (
      client.get(url, config)
        .then(response => response.data as T)
        .catch(err => {
          throw new Error(err.message)
        })
    ),
    
    post: <T>(url: string, data = {}, config = {}) => (
      client.post(url, data, config)
        .then(response => response.data as T)
        .catch(err => {
          throw new Error(err.message)
        })
    ),

    put: <T>(url: string, data = {}, config = {}) => (
      client.put(url, data, config)
        .then(response => response.data as T)
        .catch(err => {
          throw new Error(err.message)
        })
    ),

    patch: <T>(url: string, data = {}, config = {}) => (
      client.patch(url, data, config)
        .then(response => response.data as T)
        .catch(err => {
          throw new Error(err.message)
        })
    ),

    // todo
    delete: (url, config = {}) => client.delete(url, config),
  }
}
