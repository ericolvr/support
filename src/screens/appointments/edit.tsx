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
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { Check, ChevronsUpDown, Trash } from 'lucide-react'
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
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { AppSidebar } from '@/components/app/app-sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

import ApiTicket from './service'
import ApiSupplier from '../suppliers/service'
import ApiBranch from '../branchs/service'
import ApiService from '../services/service'
import { Calendar } from '@/components/ui/calendar'


const FormSchema = z.object({
    client: z.string({ required_error: 'Selecione o cliente' }),
    uniorg: z.string({ required_error: 'Selecione a agência' }),
    supplier: z.number({ required_error: 'Selecione o prestador' }),
    ticket_date: z.string({ required_error: 'Informe a data' }),
    services: z.array(z.object({
        service_name: z.number({ required_error: 'Selecione o serviço' }),
        service_quantity: z.string({ required_error: 'Selecione a quantidade' }),
    }))
})


export function EditAppointment() {
    const navigate = useNavigate()
    const { id } = useParams()

    // control command component
    const [open, setOpen] = useState(false)
    const [openSupplier, setOpenSupplier] = useState(false)
    const [openService, setOpenService] = useState<{ [key: number]: boolean }>({})

    // control lists
    const [clients, setClients] = useState([])
    const [branchs, setBranchs] = useState([])
    const [suppliers, setSupliers] = useState([])
    const [servicesList, setServicesList] = useState([])
    const [items, setItems] = useState([])

    // others
    const [protocol, setProtocol] = useState('')
    const [loading, setLoading] = useState(true)
    const [ticket, setTicket] = useState(null)

    // ticket data
    const [date, setDate] = useState<Date | null>(null)
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            client: '',
            uniorg: '',
            supplier: 0,
            ticket_date: '',
            services: [{ service_name: 0, service_quantity: '' }]
        }
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formattedData = {
            ...data,
            ticket_date: date ? format(date, 'yyyy-MM-dd') : ''
        }
        try {
            const response = await ApiTicket.Update({ protocol, data: formattedData })
            if (response === 200) {
                navigate('/tickets')
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    const getClients = async () => {
        const response = await ApiBranch.GetClients()
        setClients(response)
    }

    const getBranchs = async (client) => {
        const response = await ApiBranch.GetBranchByClient({ client })
        setBranchs(response)
    }

    const getSuppliers = async () => {
        const response = await ApiSupplier.GetAllSuppliers()
        setSupliers(response)
    }

    const getServices = async () => {
        const response = await ApiService.GetAllServices()
        setServicesList(response)
    }

    const getTicket = async () => {
        const response = await ApiTicket.GetTicketByID({ id })
        getBranchs(response.client)
        if (response) {
            setTicket(response)
            setProtocol(response.id)
            setItems(response.items)
            form.setValue('client', response.client)
            form.setValue('uniorg', response.uniorg)
            form.setValue('supplier', response.supplier_id)
            form.setValue('ticket_date', response.ticket_date)
            form.setValue('services', response.items.map(item => ({
                service_name: item.service_id,
                service_quantity: item.service_quantity.toString()
            })))
            setDate(new Date(response.ticket_date))
        }
        setLoading(false)
    }

    useEffect(() => {
        getTicket()
        getClients()
        getSuppliers()
        getServices()
    }, [])

    const [services, setServices] = useState([
        { id: 1, service: '', quantity: 0 }
    ])

    // add service to list
    const addService = () => {
        setServices([
            ...services,
            { id: services.length + 1, service: '', quantity: 0 }
        ])
    }

    // remove service from list
    const removeService = (id: number) => {
        setServices(services.filter(service => service.id !== id))
    }

    if (loading) {
        return <p>Loading...</p>
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
                                        <Link to='/appointments'>Apontamentos</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className='hidden md:block' />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Editando: {protocol}</BreadcrumbPage>
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
                                            name='client'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cliente</FormLabel>
                                                    { loading ? (
                                                            <p>loading</p>
                                                        ) : (
                                                            <Select
                                                                value={field.value}
                                                                onValueChange={(value) => {
                                                                    field.onChange(value)
                                                                    getBranchs(value)
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder='Selecione o Cliente' />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {clients.map((client, i) => (
                                                                        <SelectItem key={i} value={client.client}>{client.client}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        )
                                                    }

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='w-1/2'>
                                    <FormField
                                            control={form.control}
                                            name='uniorg'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-col mt-1'>
                                                    <FormLabel>Agência</FormLabel>
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant='outline'
                                                                role='combobox'
                                                                aria-expanded={open}
                                                                className='w-full justify-between'
                                                            >
                                                                {field.value
                                                                    ? branchs.find((branch) => branch.uniorg === field.value)?.uniorg
                                                                    : 'Selecione a agência'}
                                                                <ChevronsUpDown className='opacity-50' />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className='p-0'>
                                                            <Command>
                                                                <CommandInput placeholder='Buscar agência' />
                                                                <CommandList>
                                                                    <CommandEmpty>Não encontrada</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {branchs.map((branch) => (
                                                                            <CommandItem
                                                                                key={branch.uniorg}
                                                                                onSelect={() => {
                                                                                    form.setValue('uniorg', branch.uniorg)
                                                                                    setOpen(false)
                                                                                }}
                                                                            >
                                                                                {branch.uniorg}
                                                                                <Check
                                                                                    className={cn(
                                                                                        'ml-auto',
                                                                                        field.value === branch.id ? 'opacity-100' : 'opacity-0'
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
                                </div>

                                <div className='flex items-center mt-5 mb-3'>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='ticket_date'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-col mt-1'>
                                                    <FormLabel>Data </FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    'w-full flex justify-start',
                                                                    !date && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {date ? format(date, "dd-MM-yyyy", { locale: ptBR }) : <span>Selecione uma data</span>}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={date}
                                                                onSelect={(selectedDate) => {
                                                                    setDate(selectedDate)
                                                                    field.onChange(format(selectedDate, 'yyyy-MM-dd'))
                                                                }}
                                                                initialFocus
                                                                locale={ptBR}
                                                            />
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
                                            name='supplier'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-col mt-1'>
                                                    <FormLabel>Prestador</FormLabel>
                                                    <Popover open={openSupplier} onOpenChange={setOpenSupplier}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant='outline'
                                                                role='combobox'
                                                                aria-expanded={openSupplier}
                                                                className='w-full justify-between'
                                                            >
                                                                {field.value
                                                                    ? suppliers.find((supplier) => supplier.id === field.value)?.name
                                                                    : 'Selecione o prestador'}
                                                                <ChevronsUpDown className='opacity-50' />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className='p-0'>
                                                            <Command>
                                                                <CommandInput placeholder='Buscar prestador' />
                                                                <CommandList>
                                                                    <CommandEmpty>Não encontrada</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {suppliers.map((supplier) => (
                                                                            <CommandItem
                                                                                key={supplier.id}
                                                                                onSelect={() => {
                                                                                    form.setValue('supplier', supplier.id)
                                                                                    setOpen(false)
                                                                                }}
                                                                            >
                                                                                {supplier.name}
                                                                                <Check
                                                                                    className={cn(
                                                                                        'ml-auto',
                                                                                        field.value === supplier.id ? 'opacity-100' : 'opacity-0'
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
                                </div>

                                
                                {/* {
                                    items.map((item) => {
                                        console.log(item, 'item')
                                    })
                                } */}

{items.map((item, index) => (
    <div className='flex items-center mt-5' key={item.id}>
        <div className='w-1/2 mr-8'>
            <FormField
                control={form.control}
                name={`services.${index}.service_name`}
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
                                    <CommandInput placeholder='Buscar serviço' />
                                    <CommandList>
                                        <CommandEmpty>Não encontrado</CommandEmpty>
                                        <CommandGroup>
                                            {servicesList.map((service) => (
                                                <CommandItem
                                                    key={service.id}
                                                    onSelect={() => {
                                                        form.setValue(`services.${index}.service_name`, service.id)
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
                name={`services.${index}.service_quantity`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Quantidade</FormLabel>
                        <Input type='number' placeholder='Quantidade' {...field} />
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        {index > 0 && (
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

                                <div className='pt-4'>
                                    <Button
                                        onClick={addService}
                                        type='button'
                                        className='w-full bg-black text-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        Incluir Mais Serviços
                                    </Button>
                                </div>

                                <div className='pt-6'>
                                    <Button
                                        className='bg-black text-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
                                        Salvar Alterações
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
