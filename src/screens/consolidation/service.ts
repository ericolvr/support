import axios from 'axios';
const BASE_URL = import .meta.env.VITE_API_URL;


class ApiConsolidation {
    static async GetAll() {
        try {
            const response = await axios.get(
                `${BASE_URL}/tickets/appointments`
            )
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async GetAppointmentByFilteredDate(from: string, to: string)  {
        try {
            const response = await axios.get(
                `${BASE_URL}/tickets/date?from=${from}&to=${to}`
            )

            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    
}

export default ApiConsolidation