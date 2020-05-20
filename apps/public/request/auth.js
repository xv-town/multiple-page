import fetch from '../utils/fetch'
import * as apis from './auth-apis'

export function GetVerifyCode (params) {
  return fetch.get(apis.AuthGetVerifyCode, { params })
}
export function AuthRegister (params) {
  return fetch.post(apis.AuthRegister, params)
}
export function Login (params) {
  return fetch.post(apis.Login, params)
}
export function Logout (params) {
  return fetch.get(apis.Logout, { params })
}
