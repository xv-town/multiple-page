import fetch from '../utils/fetch';

export async function GetOrderBase () {
  return fetch.get('/order/base');
}