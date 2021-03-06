export default function ({ app: { $axios } }) {
  $axios.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response拦截器，数据返回后，可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(
    (res) => {
      if (res.status === 204) {
        return res.data
      }
      if (res.data.code) {
        return Promise.reject(new Error(res.data.message))
      }
      return res.data
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
