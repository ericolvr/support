import axios from 'axios'
const BASE_URL = import .meta.env.VITE_API_URL


class ApiUser {
    static async GetAllUsers() {
        try {
            const response = await axios.get(
                `${BASE_URL}/users/`
            )
            if (response.status === 200) {
                return response.data
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }   
    
    static async Insert({ data }) {
        try {
            const response = await axios.post(
                `${BASE_URL}/users`,
                data
            )
            
            if (response.status === 201) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async GetUserByID({ id }) {
        try {
            const response = await axios.get(
                `${BASE_URL}/users/id?id=${id}`   
            )
            if (response.status === 200) {
                return response.data
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async Update({ id, data }) {
        try {
            const response = await axios.patch(`${BASE_URL}/users/update/${id}`, data)
            if (response.status === 200) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default ApiUser