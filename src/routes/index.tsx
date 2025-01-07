import { 
    BrowserRouter, 
    Route, 
    Routes
} from 'react-router-dom'
import { PrivateRoutes } from '@/routes/privateRoutes'  
import { SignIn } from '@/screens/signin'
import { Dashboard } from '@/screens/dashboard'
import { ListUsers } from '@/screens/users/list'
import { AddUsers } from '@/screens/users/add'
import { EditUser } from '@/screens/users/edit'
import { ListSuppliers } from '@/screens/suppliers/list'
import { AddSuppliers } from '@/screens/suppliers/add'
import { EditSupplier } from '@/screens/suppliers/edit'
import { ListServices } from '@/screens/services/list'
import { AddServices } from '@/screens/services/add'
import { EditService } from '@/screens/services/edit'
import { ListAgencies } from '@/screens/branchs/list'
import { AddAgencies } from '@/screens/branchs/add'
import { EditAgency } from '@/screens/branchs/edit'
import { ListTickets } from '@/screens/tickets/list'
import { AddTickets } from '@/screens/tickets/add'

import { AddClient } from '@/screens/clients/add'
import { ListClients } from '@/screens/clients/list'
import { EditClient } from '@/screens/clients/edit'
import { AddTicketServices } from '@/screens/tickets/addTicketServices'

import { Unauthorized } from '@/screens/unauthorized'
import { AddTicketProducts } from '@/screens/tickets/AddTicketProducts'


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/dashboard' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <Dashboard />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/users' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <ListUsers />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/users/add' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <AddUsers />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/users/edit/:id' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <EditUser />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/suppliers' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <ListSuppliers />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/suppliers/add' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <AddSuppliers />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/suppliers/edit/:id' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <EditSupplier />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/services' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <ListServices />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/services/add' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <AddServices />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/services/edit/:id' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <EditService />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/clients' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <ListClients />
                    </PrivateRoutes>
                } 
                />
                <Route path='/clients/add' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <AddClient />
                    </PrivateRoutes>
                } 
                />
                <Route path='/clients/edit/:id' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <EditClient />
                    </PrivateRoutes>
                } 
                />
                <Route path='/branchs' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <ListAgencies />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/branchs/add' element={
                        <PrivateRoutes allowedRoles={['0']}>
                            <AddAgencies />
                        </PrivateRoutes>
                    } 
                />
                <Route path='/branchs/edit/:id' element={
                        <PrivateRoutes allowedRoles={['0']}>
                            <EditAgency />
                        </PrivateRoutes>
                    } 
                />
                <Route path='/tickets' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <ListTickets />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/tickets/add' element={
                    <PrivateRoutes allowedRoles={['0','1']}>
                        <AddTickets />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/tickets/services/:number' element={
                    <PrivateRoutes allowedRoles={['0','1']}>
                        <AddTicketServices />
                    </PrivateRoutes>
                    } 
                />
                <Route path='/tickets/products/:number' element={
                    <PrivateRoutes allowedRoles={['0','1']}>
                        <AddTicketProducts />
                    </PrivateRoutes>
                    } 
                />
                {/* <Route path='/tickets/edit/:id' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <EditTicket />
                    </PrivateRoutes>
                    } 
                />

                <Route path='/appointments' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <ListAppointments />
                    </PrivateRoutes>
                } 
                />
                <Route path='/appointments/add' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <AddAppointments />
                    </PrivateRoutes>
                }
                />
                <Route path='/appointments/edit/:id' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <EditAppointment />
                    </PrivateRoutes>
                } 
                />

                <Route path='/consolidation' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <Consolidation />
                    </PrivateRoutes>
                } 
                />
                <Route path='/consolidation/date-range' element={
                    <PrivateRoutes allowedRoles={['0']}>
                        <ConsolidationDateRange />
                    </PrivateRoutes>
                } 
                />

                <Route path='/unauthorized' element={
                    <PrivateRoutes allowedRoles={['0', '1']}>
                        <Unauthorized />
                    </PrivateRoutes>
                } 
                /> */}
            </Routes>
        </BrowserRouter>
    )
}
