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
import { Textarea } from '@/components/ui/textarea'

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

import ApiService from './service'


const FormSchema = z.object({
	name: z.string().min(5, {message: 'Mínimo 5 caracteres'}),
    code: z.string().min(1, {message: 'Mínimo 1 caracteres'}),
    price: z.string()
    .min(7, { message: 'Mínimo 7 dígitos' })
    .max(10, { message: 'Máximo 10 dígitos' }),
    description: z.string().min(2, {message: 'Mínimo 11 caracteres'}),
})

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

export function AddServices() {
    const [price, setPrice] = useState('')
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const priceChanged = event.target.value
        setPrice(formatCurrency(priceChanged))
        form.setValue('price', priceChanged)
    }

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        const updateData = {
            ...data,
            price: price.replace('R$', '').replace(/\s+/g, '').replace(',', '.').trim(),
        }
        
        try {
            const response = await ApiService.Insert({ data: updateData })
            if (response === 201) {                
                navigate('/services')
            } else {
                toast.error('Error adding service');
            }
        } catch (error) {
            console.log(error, 'error')
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
                                            <Link to='/services'>Serviços</Link>
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
                                                    <FormLabel>Serviço</FormLabel>
                                                    <Input placeholder='Serviço' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='code'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Código de serviço</FormLabel>
                                                    <Input placeholder='Código de serviço' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='price'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Custo de Serviço</FormLabel>
                                                    <Input 
                                                        placeholder='Orçamento'
                                                        {...field}
                                                        value={price}
                                                        onChange={handlePriceChange}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='flex items-center mt-5'>
                                    <div className='w-full'>
                                        <FormField
                                            control={form.control}
                                            name='description'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Descrição</FormLabel>
                                                    <Textarea placeholder='Descrição do serviço' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='pt-7'>
                                    <Button type='submit' 
                                        className='bg-black text-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
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