import axios from 'axios'
const BASE_URL = import .meta.env.VITE_API_URL
const STOCK_URL = import.meta.env.VITE_STOCK_URL

class ApiTicket {
    static async GetLast() {
        try {
            const response = await axios.get(
                `${BASE_URL}/tickets/last`
            )
            if (response.status == 200) {
                const number = parseInt(response.data['number'], 10) + 1
                return number
            }
        } catch (error) {
            console.log(error)
        }
    }


    static async Insert({ data }) {
        try {
            const response = await axios.post(
                `${BASE_URL}/tickets/`, data
            )
            if (response.status === 201) {
                return response.status
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async GetAll() {
        try {
            const response = await axios.get(
                `${BASE_URL}/tickets/`
            )
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async GetAllFiltered() {
        try {
            const response = await axios.get(
                `${BASE_URL}/tickets/filtered/`
            )
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async GetTicketByID({ id }) {
        try {
            const response = await axios.get(
                `${BASE_URL}/tickets/id?id=${id}`
            )
            
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async Update({ protocol, data }) {
        try {
            const response = await axios.patch(
                `${BASE_URL}/tickets/update/${protocol}`, 
                data
            )
            if (response.status === 200) {
                return response.status
            }
            return response.data

        } catch (error) {
            console.log(error)
        }
        return 201
    }

    static async ServiceToTicket({ number, services, fomattedDate }) {
        const data = {
            number: number,
            services: services,
            date_added: '2024-01-01'
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/items/`, data
            )
            if (response.status === 201) {
                return response.status
            }
        } catch (error) {

        }
    }

    static async GetCategories({ number }) {
        try {
            const response = await axios.get(
                `${STOCK_URL}/categories`
            )
            console.log(response.data)
            return response.data
        } catch (error) {

        }
    }
}

export default ApiTicket