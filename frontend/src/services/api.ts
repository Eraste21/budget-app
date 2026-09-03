const API_URL = 'http://localhost:3001'

const getToken = () => localStorage.getItem('token')

export default API_URL

export const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken}`,
})