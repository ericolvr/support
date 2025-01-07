'use client'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Check, ChevronsUpDown, Plus, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AppSidebar } from '@/components/app/app-sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

import ApiService from '../services/service'
import ApiTicket from './service'

const FormSchema = z.object({
    services: z.array(z.object({
        service_name: z.number({ required_error: 'Selecione o serviço' }),
        service_quantity: z.string({ required_error: 'Selecione a quantidade' }),
    }))
})


export function AddTicketServices() {
    const navigate = useNavigate() 
    const {number} = useParams() 
    const [openService, setOpenService] = useState<{ [key: number]: boolean }>({})
    const [servicesList, setServicesList] = useState([])
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        
        const formattedDate = {
            date_added: format(new Date(), 'yyyy-MM-dd')
        }
        try {
            const response = await ApiTicket.ServiceToTicket({ 
                number, 
                services: data.services, 
                fomattedDate: formattedDate 
            })

            if (response === 201) {
                navigate('/tickets/products/' + number)
            }
        
        } catch (error) {
            console.log(error, 'error')
        }
    }

    const getServices = async () => {
        const response = await ApiService.GetAllServices()
        setServicesList(response)
    }

    useEffect(() => {
        getServices()
    }, [])

    const [services, setServices] = useState([
        { id: 1, service: '', quantity: 0 }
    ])

    const addService = () => {
        setServices([
            ...services,
            { id: services.length + 1, service: '', quantity: 0 }
        ])
    }

    const removeService = (id: number) => {
        setServices(services.filter(service => service.id !== id))
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
                                        <Link to='/tickets'>Tíckets</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className='hidden md:block' />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Serviços - Tícket <b>{number}</b></BreadcrumbPage>
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

                                {/* new fields */}
                                {services.map((item) => (
                                    <div className='flex items-center mt-5' key={item.id}>
                                        <div className='w-1/2 mr-8'>
                                            <FormField
                                                control={form.control}
                                                name={`services.${item.id - 1}.service_name`}
                                                render={({ field }) => (
                                                    <FormItem className='flex flex-col mt-1'>
                                                        <FormLabel htmlFor={`service-select-${item.id}`}>Serviço</FormLabel>
                                                        <Popover open={openService[item.id] || false} onOpenChange={(isOpen) => setOpenService({ ...openService, [item.id]: isOpen })}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant='outline'
                                                                    role='combobox'
                                                                    aria-expanded={openService[item.id] || false}
                                                                    className='w-full justify-between'
                                                                    type='button'
                                                                    id={`service-select-${item.id}`}
                                                                >
                                                                    {field.value
                                                                        ? servicesList.find((service) => service.id === field.value)?.name
                                                                        : 'Selecione o serviço'}
                                                                    <ChevronsUpDown className='opacity-50' />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className='p-0'>
                                                                <Command>
                                                                    <CommandInput placeholder='Buscar agência' />
                                                                    <CommandList>
                                                                        <CommandEmpty>Não encontrado</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {servicesList.map((service) => (
                                                                                <CommandItem
                                                                                    key={service.id}
                                                                                    onSelect={() => {
                                                                                        form.setValue(`services.${item.id - 1}.service_name`, service.id)
                                                                                        setOpenService({ ...openService, [item.id]: false })
                                                                                    }}
                                                                                >
                                                                                    {service.name}
                                                                                    <Check
                                                                                        className={cn(
                                                                                            'ml-auto',
                                                                                            field.value === service.id ? 'opacity-100' : 'opacity-0'
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className='w-1/2'>
                                            <FormField
                                                control={form.control}
                                                name={`services.${item.id - 1}.service_quantity`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Quantidade</FormLabel>
                                                        <Input type='number' placeholder='Quantidade' {...field} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {item.id > 1 && (
                                            <div className='w-auto ml-4'>
                                                <Button
                                                    type='button'
                                                    onClick={() => removeService(item.id)}
                                                    className='bg-red-500 text-white hover:bg-red-700 mt-8'
                                                >
                                                    <Trash className='h-4 w-4' />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className='pt-6'>
                                    <Button
                                        className='bg-black text-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        Adicionar
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                    <div className='pt-4 text-right'>
                        <Button
                            onClick={addService}
                            type='button'
                            className='bg-black text-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                <Plus />
                        </Button>
                    </div>
                </div>
            </SidebarInset>
        </>
    )
}
