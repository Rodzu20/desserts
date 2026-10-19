import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
})

api.interceptors.request.use(async (config) => {
  if (config.method === 'get') {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1200)
    })
  }

  return config
})