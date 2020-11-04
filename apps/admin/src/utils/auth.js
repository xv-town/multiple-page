export const isLogin = () => {
  return localStorage.getItem('token');
}
export const saveToken = (token) => {
  localStorage.setItem('token', token);
}
export const removeToken = () => {
  localStorage.removeItem('token');
}
