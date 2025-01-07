import axios from 'axios';
const BASE_URL = import .meta.env.VITE_API_URL;


class ApiService {
    static async GetAllServices() {
        try {
            const response = await axios.get(
                `${BASE_URL}/services/`
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
                `${BASE_URL}/services/`,
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

    static async GetServiceByID({id}) {
        try {
            const response = await axios.get(
                `${BASE_URL}/services/id?id=${id}`   
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
            const response = await axios.patch(`${BASE_URL}/services/update/${id}`, data);
            if (response.status === 200) {
                return response.status;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ApiService