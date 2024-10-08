import axios from 'axios'
const instance = axios.create({
  baseURL: "https://www.wenchangstreet.com:10086"
})
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    // console.log(token, 6)
    if (token) {
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      location.href = '/login'
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)
export default instance
