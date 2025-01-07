import { useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '@/context/general'

export function PrivateRoutes({ allowedRoles, children }) {
    const { role, authenticated } = useContext(AuthContext)

    useEffect(() => {
    }, [role, authenticated])

    if (!authenticated) {
        return <Navigate to='/' />
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to='/unauthorized' />
    }

    return children
}

