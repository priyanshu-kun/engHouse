import axios from "axios"

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
        Accept: 'application/json'
    }
    // 
})


// list of all the endpoints
export const sendOtp = (data) => api.post("http://localhost:5500/api/send-otp",data)
export const verifyOtp = (data) => api.post("http://localhost:5500/api/verify-otp",data)
export const activate = (data) => api.post("http://localhost:5500/api/activate",data)
export const logout = () => api.post('http://localhost:5500/api/logout')
export const createRoom = (data) => api.post('http://localhost:5500/api/rooms',data)


// Interceptors
api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
        originalRequest.isRetry = true;
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
                withCredentials: true
            })
            return api.request(originalRequest)
        }
        catch(e) {
            console.log(e.message)
        }
    }
    else {
        throw new Error();
    }
})

export default api