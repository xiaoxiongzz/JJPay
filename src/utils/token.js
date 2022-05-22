// 存储token
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}
//持久化存储
export const getToken = (token) => {
    return localStorage.getItem('TOKEN')
}
//清除本地存储
export const reToken = () => {
    localStorage.removeItem('TOKEN')
}