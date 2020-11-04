import fetch from '../utils/fetch';

export async function login (params) {
  return fetch.post('/auth/login', params);
}