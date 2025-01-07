

class Storage {
    static async StoreUserData(data) {
        const name = data['name']
        const token = data['access_token']
        const role = data['role']
        const supplierid = data['supplier_id']
        try {
            localStorage.setItem('name', name)
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)

            if ((supplierid !== undefined) && (supplierid !== null)) {
                localStorage.setItem('supplierid', supplierid)
            }
        } catch (error) {
            console.log(error)
        }
    }

    static RetrieveUserData() {
        try {
            const name = localStorage.getItem('name')
            const token = localStorage.getItem('token')
            const role = localStorage.getItem('role')
            const supplierid = localStorage.getItem('supplierid')

            if (supplierid) {
                return { name, token, role, supplierid }
            }

            if (name && token && role){
                return { name, token, role }
            } else {
                return 
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async DeleteUserToken() {
        try {
            localStorage.removeItem('name')
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('userid')
            localStorage.removeItem('supplierid')
        } catch (error) {
            console.log(error)
        }
    }
}

export default Storage