import axios from 'axios'
const BASE_URL = import .meta.env.VITE_API_URL


class ApiSignin {
    static async GetToken({ data }) {
        try {
            const response = await axios.post(
                `${BASE_URL}/signin/token`, data
            )
            if (response.status === 201) {            
                return response.data
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default ApiSignin