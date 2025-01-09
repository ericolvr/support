import { useState } from 'react'
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
    name: z.string().min(3, { message: 'Mínimo 3 caracteres' }),
    cost_center: z.string().min(3, { message: 'Mínimo 3 caracteres' }),
    budget: z.string().min(3, { message: 'Mínimo 3 digitos' }),
});

const formatCurrency = (value: string) => {
    let formattedValue = value.replace(/[^\d,]/g, '')
    formattedValue = formattedValue.replace(/,/g, '')
    if (formattedValue.length > 2) {
        formattedValue = formattedValue.replace(/(\d)(\d{2})$/, '$1,$2')
    }
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    formattedValue = `R$ ${formattedValue}`
    return formattedValue
}

export function AddClient() {
    const [budget, setBudget] = useState('')
    const navigate = useNavigate()
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const bugdetChanged = event.target.value
        setBudget(formatCurrency(bugdetChanged))
        form.setValue('budget', bugdetChanged)
    }
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        
        const updateData = {
            ...data,
            budget: budget.replace('R$', '').replace(/\s+/g, '').replace(',', '.').trim(),
        }

        try {
            const response = await ApiBranch.Insert({ data: updateData })
            if (response === 201) {
                navigate('/clients')
            } else {
                toast.error('Error adding client')
            }
        } catch (error) {
            toast.error('Erro inesperado')
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

                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='budget'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Orçamento</FormLabel>
                                                    <Input 
                                                        placeholder='Orçamento'
                                                        {...field}
                                                        value={budget}
                                                        onChange={handleBudgetChange}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='cost_center'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Centro de custo</FormLabel>
                                                    <Input placeholder='centro de custo' {...field} />
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