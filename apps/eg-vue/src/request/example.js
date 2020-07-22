import fetch from 'public/utils/fetch'
import * as apis from './example-apis'

export function UCGetUserInfo (params) {
  return fetch.get(apis.UCGetUserInfo, { params })
}
export function UCGetUserBaseInfo (params) {
  return fetch.post(apis.UCGetUserBaseInfo, params)
}