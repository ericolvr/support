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

import { AppSidebar } from '@/components/app/app-sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { 
    SidebarInset, 
    SidebarTrigger 
} from '@/components/ui/sidebar'
import ApiBranch from './service'


const FormSchema = z.object({
    client: z.string({required_error: "Selecione o cliente"}),
    name: z.string().min(3, {message: 'Mínimo 3 caracteres'}),
    uniorg: z.string().min(3, {message: 'Mínimo 3 caracteres'}),
    document: z.string().min(11, {message: 'Mínimo 11 caracteres'}),
    zipcode: z.string().min(9, {message: 'Mínimo 9 caracteres'}),
    state: z.string().min(2, {message: 'Mínimo 2 caracteres'}),
    city: z.string().min(3, {message: 'Mínimo 3 caracteres'}),
    neighborhood: z.string().min(3, {message: 'Mínimo 3 caracteres'}),
    address: z.string().min(5, {message: 'Mínimo 5 caracteres'}),
    complement: z.string().min(2, { message: 'Mínimo 2 caracteres' }).optional(),
});


export function EditAgency() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [clients, setClients] = useState([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await ApiBranch.Update({ id, data })
            if (response === 200) {                
                navigate('/branchs')
            } 
        } catch (error) {
            console.log('Error:', error)
            
        }
    }

    const getBranch = async () => {
        try {
            const response = await ApiBranch.GetBranchByID({ id })
            if (response) {
                form.setValue('client', response.client)
                form.setValue('name', response.name)
                form.setValue('uniorg', response.uniorg)
                form.setValue('document', response.document)
                form.setValue('zipcode', response.zipcode)
                form.setValue('state', response.state)
                form.setValue('city', response.city)
                form.setValue('neighborhood', response.neighborhood)
                form.setValue('address', response.address)
                form.setValue('complement', response.complement)
            }
        } catch (error) {
            console.log('Error:', error)
        } finally {
            setLoading(false);
        }
    }

    const getClients = async () => {
        const response = await ApiBranch.GetAllClients()
        setClients(response)
    }

    useEffect(() => {
        getBranch()
        getClients()
    }, [id])
              
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
                                            <Link to='/branchs'>Agências</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className='hidden md:block' />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Editando: {form.watch('uniorg')}</BreadcrumbPage>
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
                                    <div className='w-full'>
                                        <FormField
                                            control={form.control}
                                            name='client'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cliente</FormLabel>
                                                    {loading ? (
                                                        <p>Loading...</p>
                                                    ) : (
                                                        <Select
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
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
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> 
                                    </div>
                                </div>

                                <div className='flex items-center mt-5'>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome</FormLabel>
                                                    <Input placeholder='Nome da agência' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='uniorg'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Uniorg</FormLabel>
                                                    <Input placeholder='Uniorg' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='document'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CNPJ</FormLabel>
                                                    <Input type='text' placeholder='Número CNPJ' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='flex items-center mt-5'>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='zipcode'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CEP</FormLabel>
                                                    <Input type='text' placeholder='Zipcode' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='state'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Estado</FormLabel>
                                                    <Input type='text' placeholder='Estado' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='city'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cidade</FormLabel>
                                                    <Input type='text' placeholder='Cidade' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='flex items-center mt-5'>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='neighborhood'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Bairro</FormLabel>
                                                    <Input type='text' placeholder='Bairro' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='address'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Endereço</FormLabel>
                                                    <Input type='text' placeholder='Endereço' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='complement'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Complemento</FormLabel>
                                                    <Input type='text' placeholder='Complemento' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='pt-7'>
                                    <Button type='submit' 
                                        className='bg-black hover:bg-[#23CFCE] text-white dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
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