import { useState, useEffect } from 'react'
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

import { DataTable } from './data-table'
import { columns } from './columns'
import ApiService from './service'
import { Link } from 'react-router-dom'


export function ListServices() {
    const [services, setServices] = useState([])

    const serviceList = async () => {
        const response = await ApiService.GetAllServices()
        if (response) {
            setServices(response)
        } else {
            console.log('Erro ao buscar baterias')
        }
    }
    
    useEffect(() => {
        serviceList()
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
                                        <BreadcrumbPage>Serviços</BreadcrumbPage>
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
                        <DataTable columns={columns(setServices)} data={services} />
                    </div>
                </div> 
            </SidebarInset>
        </>
    )
}