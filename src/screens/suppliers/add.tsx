import { Link, useNavigate } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import InputMask from 'react-input-mask'
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

import ApiSupplier from './service'


const FormSchema = z.object({
    name: z.string().min(3, { message: 'Mínimo 5 caracteres' }),
    document: z.string().min(11, { message: 'Mínimo 11 caracteres' }),
    mobile: z.string().min(14, { message: 'Mínimo 14 caracteres' }),
    email: z.string().min(5, { message: 'Mínimo 5 caracteres' }),
    status: z.string({required_error: "Selecione o status"}),
    zipcode: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
    state: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
    city: z.string().min(5, { message: 'Mínimo 5 caracteres' }),
    neighborhood: z.string().min(5, { message: 'Mínimo 5 caracteres' }),
    address: z.string().min(5, { message: 'Mínimo 5 caracteres' }),
    complement: z.string().min(1, { message: 'Mínimo 1 caracteres' }).nullable().optional()
})


export function AddSuppliers() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await ApiSupplier.Insert({ data })
            if (response === 201) {                
                navigate('/suppliers')
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
                                            <Link to='/suppliers'>Fornecedores</Link>
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
                                                    <FormLabel>Nome / Empresa</FormLabel>
                                                    <Input placeholder='Nome da Empresa' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='document'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CPF / CNPJ</FormLabel>
                                                    <Input placeholder='Número do documento' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    
                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='mobile'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Celular</FormLabel>
                                                    <InputMask
                                                        mask='(99) 99999-9999'
                                                        placeholder='celular com prefixo'
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                    >
                                                        {(inputProps) => <Input {...inputProps} />}  
                                                    </InputMask>
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
                                            name='email'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <Input type='email' placeholder='Email' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name="status"
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
                                                                <SelectValue placeholder="Selecione o Status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="True">Ativo</SelectItem>
                                                            <SelectItem value="False">Inativo</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} /> 
                                    </div>

                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='zipcode'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CEP</FormLabel>
                                                    <Input type='text' placeholder='CEP' {...field} />
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
                                    <div className='w-1/2 mr-8'>
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
                                    
                                    <div className='w-1/2'>
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
                                </div>

                                <div className='flex items-center mt-5'>
                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='address'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Endereço</FormLabel>
                                                    <Input placeholder='Endereço' {...field} />
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
                                                    <Input placeholder='Complemento' {...field} />
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