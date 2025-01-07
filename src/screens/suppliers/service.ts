import axios from 'axios';
const BASE_URL = import .meta.env.VITE_API_URL;


class ApiSuppplier {
    static async GetAllSuppliers() {
        try {
            const response = await axios.get(
                `${BASE_URL}/suppliers/`
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
                `${BASE_URL}/suppliers`,
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

    static async GetSupplierByID({id}) {
        try {
            const response = await axios.get(
                `${BASE_URL}/suppliers/id?id=${id}`
                
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
            const response = await axios.patch(`${BASE_URL}/suppliers/update/${id}`, data)
            if (response.status === 200) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default ApiSuppplier