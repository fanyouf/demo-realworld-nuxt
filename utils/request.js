import axios from 'axios'
const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// request.interceptors.request.use((config) => {
//   // Do something before request is sent
//   const { user } = store.state
//   if (user) {
//     config.headers.Authorization = `Token ${user.token}`
//   }
//   return config
// }, (error) => {
//   // Do something with request error
//   return Promise.reject(error)
// })

export default request
