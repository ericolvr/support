import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink
} from '@/components/ui/breadcrumb'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { SquareArrowOutUpRight } from 'lucide-react'

import { SidebarInset, SidebarTrigger } from'@/components/ui/sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { AppSidebar } from '@/components/app/app-sidebar'


export function Dashboard() {


    return (
        <>
            <AppSidebar />
            
            <SidebarInset className='pl-9'>
                <header className='flex justify-between h-16 mt-3 ml-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                    <div className='flex items-center gap-2 px-4'>
                        <SidebarTrigger className='-ml-1' />
                            <Separator  className='mr-2 h-4' />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className='hidden md:block'>
                                        <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        
                    <div className='pr-8'>
                        <ToggleTheme />
                    </div>
                </header>

                <div className='flex flex-col items-center p-4 mt-1 mx-auto max-w-screen-lg'>
                    <div className='grid grid-cols-12 gap-8 w-full max-w-4xl'>

                        <div className='col-span-4 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]'>
                            <div className='flex justify-between items-center '>
                                <div>
                                    <h1 className='text-[20px] text-[#09090B] font-semibold dark:text-white'>Fornecedores</h1>
                                    <p className='text-[14px] text-[#9Ca3AF]'>Página de Fornecedores</p>
                                </div>
                                <div>
                                    <Link to='/suppliers'>
                                        <Button className='h-12 hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE]'>
                                            <SquareArrowOutUpRight className='dark:text-white' style={{ width: '20px', height: '20px' }} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className='col-span-4 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h1 className='text-[20px] text-[#09090B] font-semibold dark:text-white'>Serviços</h1>
                                    <p className='text-[14px] text-[#9Ca3AF]'>Página de serviços</p>
                                </div>
                                <div>
                                    <Link to='/services'>
                                    <Button className='h-12 hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE]'>
                                            <SquareArrowOutUpRight className='dark:text-white' style={{ width: '20px', height: '20px' }} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className='col-span-4 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h1 className='text-[20px] text-[#09090B] font-semibold dark:text-white'>Agências</h1>
                                    <p className='text-[14px] text-[#9Ca3AF]'>Página de Agências</p>
                                </div>
                                <div>
                                    <Link to='/branchs'>
                                    <Button className='h-12 hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE]'>
                                            <SquareArrowOutUpRight className='dark:text-white' style={{ width: '20px', height: '20px' }} />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </>
    )
}