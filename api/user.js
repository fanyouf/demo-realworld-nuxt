import { request } from '@/plugins/request'

export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users1',
    data
  })
}

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}
