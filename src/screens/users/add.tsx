import { Link, useNavigate } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
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

import ApiUser from './service'

const FormSchema = z.object({
    role: z.string().nonempty({ message: 'Selecione um tipo de usuário' }),
    name: z.string().min(5, {message: 'Mínimo 5 caracteres'}),
    mobile: z.string().min(15, { message: 'Mínimo 15 caracteres' }),
    password: z.string().min(6, {message: 'Mínimo 6 caracteres'}),
    confirm: z.string().min(6, {message: 'Mínimo 6 caracteres'}),
    change_password: z.string().min(1, {message: 'Mínimo 5 caracteres'}),
    
}).refine(data => data.password === data.confirm, {
    message: 'Senha e Confirmação devem ser os mesmos',
    path: ['confirm']
})


export function AddUsers() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            role: '', 
        },
    })
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await ApiUser.Insert({ data })
            if (response === 201) {                
                navigate('/users')
            } else {
                toast.error('Error adding user');
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
                                            <Link to='/users'>Usuários</Link>
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
                                            name='role'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tipo de Usuário</FormLabel>
                                                        <Select 
                                                            value={field.value}
                                                            onValueChange={(value) => field.onChange({
                                                                target: { value }
                                                            })}
                                                            >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder='Tipo de Usuário' />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value='0'>Administrador</SelectItem>
                                                                <SelectItem value='1'>Fornecedor</SelectItem>
                                                                <SelectItem value='2'>Suporte</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome</FormLabel>
                                                    <Input type='name' placeholder='Nome Completo' {...field} />
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
                                            name='password'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Informe a Senha</FormLabel>
                                                    <Input type='password' placeholder='Senha' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='w-1/2 mr-8'>
                                        <FormField
                                            control={form.control}
                                            name='confirm'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirme a Senha</FormLabel>
                                                    <Input type='password' placeholder='Confirmação' {...field} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='w-1/2'>
                                        <FormField
                                            control={form.control}
                                            name='change_password'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mudar Senha</FormLabel>
                                                        <Select 
                                                            value={field.value}
                                                            onValueChange={(value) => field.onChange({
                                                                target: { value }
                                                            })}
                                                            >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder='Mudar senha' />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value='0'>Não</SelectItem>
                                                                <SelectItem value='1'>Sim</SelectItem>
                                                            </SelectContent>
                                                        </Select>
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