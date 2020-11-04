import fetch from '../utils/fetch';

export async function GetStoreList () {
  return fetch.get('/store/list');
}