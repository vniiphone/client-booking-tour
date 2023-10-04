import axios from 'axios'

const JWT_TOKEN: string = localStorage.getItem('user') || ''
let token: string | null = null;
if (JWT_TOKEN) {
    try {
        const userObj = JSON.parse(JWT_TOKEN);
        token = userObj.token;
        console.log("Token: ",token);
    } catch (error) {
        console.error('Lỗi khi phân tích dữ liệu từ localStorage:', error);
    }
}
// axios.defaults.withCredentials = true
const request = axios.create({

    baseURL: 'http://localhost:8088/api',
    headers: { Authorization: `Bearer ${token}` },
})


export default request
