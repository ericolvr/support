import { useState, useEffect, useContext } from 'react'
import { AppSidebar } from '@/components/app/app-sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Link } from 'react-router-dom'

import { AuthContext } from '@/context/general'
import { DataTable } from './data-table'
import { columns } from './columns'
import ApiAppointment from './service'


export function ListAppointments() {
    const { role, supplierId } = useContext(AuthContext)
    const [appointments, setAppointments] = useState([])

    const checkUserType = () => {
        if (role === '0') {
            appointmentList()
        } else {
            appointmentFilteredList()
        }
    }

    const appointmentList = async () => {
        const response = await ApiAppointment.GetAll()
        if (response) {
            setAppointments(response)
        } else {
            console.log('Error fetching appointments')
        }
    }

    const appointmentFilteredList = async () => {
        const response = await ApiAppointment.GetAppoitmentsByUserID({ id: supplierId })
        if (response) {
            setAppointments(response)
        } else {
            console.log('Error fetching appointments')
        }
    }
    
    useEffect(() => {
        checkUserType()
    }, [])

    return (
        <>
            <AppSidebar />
            <SidebarInset className='pl-9'>
                <header className='flex justify-between h-16 mt-3 ml-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                            <Separator className='mr-2 h-4' />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className='hidden md:block'>
                                        <BreadcrumbLink>
                                            <Link to='/dashboard'>Dashboard</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className='hidden md:block' />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Apontamentos</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    <div className='pr-8'>
                        <ToggleTheme />
                    </div>
                </header>

                <div className='flex flex-1 flex-col  p-4 mt-1 mr-3 ml-3'>
                    <div className='col-span-2 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]'>
                        <DataTable columns={columns(setAppointments)} data={appointments} />
                    </div>
                </div> 
            </SidebarInset>
        </>
    )
}