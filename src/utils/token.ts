// 存储 TOKEN
export const SET_TOKEN = (token: string) => {
    localStorage.setItem('TOKEN', token)
}

// 获取 TOKEN 值
export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN')
}

// 清除 TOKEN
export const REMOVE_TOKEN = () => {
    localStorage.removeItem('TOKEN')
}