import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from '@/components/ui/breadcrumb'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { AppSidebar } from '@/components/app/app-sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { 
    SidebarInset, 
    SidebarTrigger 
} from '@/components/ui/sidebar'

import ApiBranch from './service'


const FormSchema = z.object({
    
    name: z.string().min(3, {message: 'Mínimo 3 caracteres'}),
    budget: z.string().min(3, {message: 'Mínimo 3 caracteres'}),
})


export function AddClient() {
    const navigate = useNavigate()
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await ApiBranch.Insert({ data })
            if (response === 201) {                
                navigate('/clients')
            } else {
                toast.error('Error adding client')
            }
        } catch (error) {

        }
    }
              
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
                                    <BreadcrumbItem className='hidden md:block'>
                                        <BreadcrumbLink>
                                            <Link to='/clients'>Clientes</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className='hidden md:block' />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Adicionar</BreadcrumbPage>
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
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>                            
                                <div className='flex items-center'>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cliente</FormLabel>
                                                    <Input placeholder='Nome do Cliente' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='budget'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Orçamento</FormLabel>
                                                    <Input placeholder='Orçamento' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                
                                <div className='pt-7'>
                                    <Button type='submit' 
                                        className='bg-black hover:bg-[#23CFCE] text-white dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        Adicionar
                                    </Button>
                                </div>
                            </form>    
                        </Form>
                    </div>
                </div> 
            </SidebarInset>
        </>
    )
}