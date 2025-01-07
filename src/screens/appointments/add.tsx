'use client'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    status: z.string({ required_error: 'Selecione o status' }),
    ticket_date: z.string({ required_error: 'Informe a data' }),
    services: z.array(z.object({
        service_name: z.number({ required_error: 'Selecione o serviço' }),
        service_quantity: z.string({ required_error: 'Selecione a quantidade' }),
    }))
})


export function AddAppointments() {
    const navigate = useNavigate()

    // control command component
    const [open, setOpen] = useState(false)
    const [openSupplier, setOpenSupplier] = useState(false)
    const [openService, setOpenService] = useState<{ [key: number]: boolean }>({})

    // control lists
    const [clients, setClients] = useState([])
    const [branchs, setBranchs] = useState([])
    const [suppliers, setSupliers] = useState([])
    const [servicesList, setServicesList] = useState([])

    // ticket data
    const [date, setDate] = useState<Date | null>(null)
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formattedData = {
            ...data,
            ticket_date: date ? format(date, 'yyyy-MM-dd') : ''
        }

        console.log(formattedData, 'data')
        try {
            const response = await ApiTicket.Insert({ data: formattedData })
            if (response === 201) {
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

    useEffect(() => {
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
                                            name='client'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cliente</FormLabel>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value)
                                                            getBranchs(value)
                                                        }}
                                                        defaultValue={field.value}
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
                                                                                        field.value === branch.uniorg ? 'opacity-100' : 'opacity-0'
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

                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='supplier'
                                            render={({ field }) => (
                                                <FormItem className='flex flex-col mt-1 w-full'>
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

                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='status'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Status</FormLabel>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value)

                                                        }}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder='Selecione o Status' />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem key={1} value='1'>1 - Aguarda Aprovação</SelectItem>
                                                            <SelectItem key={2} value='2'>2 - Aprovado Pelo Gestor</SelectItem>
                                                            <SelectItem key={3} value='3'>3 - Reprovado Pelo Gestor</SelectItem>
                                                            {/* status prestador */}
                                                            <SelectItem key={4} value='4'>4 - Atendimento aceito</SelectItem>
                                                            <SelectItem key={5} value='5'>5 - Atendimento Iniciciado</SelectItem>
                                                            <SelectItem key={6} value='6'>6 - Finalizado - Para Conferência</SelectItem>
                                                            {/* status operacional */}
                                                            <SelectItem key={7} value='7'>7 - Atendimento Com Erros</SelectItem>
                                                            <SelectItem key={8} value='8'>8 - Retornar à Agência</SelectItem>
                                                            <SelectItem key={9} value='9'>9 - Finalizado - Sem Pendência</SelectItem>
                                                            {/* pagamento */}
                                                            <SelectItem key={10} value='10'>10 - Divergência nos Itens</SelectItem>
                                                            <SelectItem key={11} value='11'>11 - Pagamento Aprovado</SelectItem>
                                                            <SelectItem key={12} value='12'>12 - Nota Emitida</SelectItem>
                                                            <SelectItem key={13} value='13'>13 - Foi Pago</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>


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
