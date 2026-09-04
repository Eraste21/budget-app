const API_URL = 'http://localhost:3001'

const getToken = () => localStorage.getItem('token')

export default API_URL

export const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
})

export const checkResponse = async (response: Response, fallbackMessage: string): Promise<void> => {
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || fallbackMessage)
    }
}
