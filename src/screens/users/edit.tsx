import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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

import ApiService from './service'

const FormSchema = z.object({
    role: z.string().min(1, {message: 'Mínimo 1 caracteres'}),
    name: z.string().min(1, {message: 'Mínimo 1 caracteres'}),
    mobile: z.string().min(1, {message: 'Mínimo 1 caracteres'}),
    password: z.string().optional(),
    confirm: z.string().optional(),
}).refine(data => data.password === data.confirm, {
    message: 'As senhas não coincidem',
    path: ['confirm'], // path of error
})

export function EditUser() {
    const id = useParams().id
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const formattedData = {
                ...data,
                password: data.password || undefined, // Remove password if not provided
            }
            const response = await ApiService.Update({ id, data: formattedData })
            if (response === 200) {                
                navigate('/users')
            } else {
                toast.error('Error adding user')
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    const getUser = async () => {
        try {
            const response = await ApiService.GetUserByID({ id })
            if (response) {
                setName(response.name)
                form.setValue('role', response.role)
                form.setValue('name', response.name)
                form.setValue('mobile', response.mobile)
            }
        } catch (error) {
            console.log('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])
              
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
                                        <BreadcrumbPage>Editando: {name}</BreadcrumbPage>
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
                                                            onValueChange={field.onChange}
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
                                                    <FormLabel>Name</FormLabel>
                                                    <Input placeholder='Name' {...field} />
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
                                                    <FormLabel>Mobile</FormLabel>
                                                    <Input placeholder='Mobile' {...field} />
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

                                    <div className='w-1/2'>
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
                                </div>

                                <div className='pt-7'>
                                    <Button type='submit' 
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


// import { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { Separator } from '@radix-ui/react-dropdown-menu'
// import { z } from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { toast } from 'sonner'
// import { 
//     Breadcrumb, 
//     BreadcrumbList, 
//     BreadcrumbItem, 
//     BreadcrumbLink, 
//     BreadcrumbPage, 
//     BreadcrumbSeparator 
// } from '@/components/ui/breadcrumb'

// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form'
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select'

// import { AppSidebar } from '@/components/app/app-sidebar'
// import { ToggleTheme } from '@/components/toggleTheme'
// import { 
//     SidebarInset, 
//     SidebarTrigger 
// } from '@/components/ui/sidebar'

// import ApiService from './service'

// const FormSchema = z.object({
//     role: z.string().min(1, {message: 'Mínimo 1 caracteres'}),
//     name: z.string().min(1, {message: 'Mínimo 1 caracteres'}),
//     mobile: z.string().min(1, {message: 'Mínimo 1 caracteres'}),
//     password: z.string().optional(),
//     confirm: z.string().optional(),
// }).refine(data => data.password === data.confirm, {
//     message: 'As senhas não coincidem',
//     path: ['confirm'], // path of error
// })

// export function EditUser() {
//     const id = useParams().id
//     const navigate = useNavigate()
//     const [loading, setLoading] = useState(true)
//     const [name, setName] = useState('')

//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//     })
    
//     async function onSubmit(data: z.infer<typeof FormSchema>) {
//         try {
//             const formattedData = {
//                 ...data,
//                 password: data.password || undefined, // Remove password if not provided
//             }
//             const response = await ApiService.Update({ id, data: formattedData })
//             if (response === 200) {                
//                 navigate('/users')
//             } else {
//                 toast.error('Error adding user')
//             }
//         } catch (error) {
//             console.log(error, 'error')
//         }
//     }

//     const getUser = async () => {
//         try {
//             const response = await ApiService.GetUserByID({ id })
//             console.log('Response:', response)
//             if (response) {
//                 setName(response.name)
//                 form.setValue('role', response.role)
//                 form.setValue('name', response.name)
//                 form.setValue('mobile', response.mobile)
//             }
//         } catch (error) {
//             console.log('Error:', error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         getUser()
//     }, [])
              
//     return (
//         <>
//             <AppSidebar />
//             <SidebarInset className='pl-9'>
//                 <header className='flex justify-between h-16 mt-3 ml-3 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
//                     <div className='flex items-center gap-2 px-4'>
//                         <SidebarTrigger className='-ml-1' />
//                             <Separator className='mr-2 h-4' />
//                             <Breadcrumb>
//                                 <BreadcrumbList>
//                                     <BreadcrumbItem className='hidden md:block'>
//                                         <BreadcrumbLink>
//                                             <Link to='/dashboard'>Dashboard</Link>
//                                         </BreadcrumbLink>
//                                     </BreadcrumbItem>
//                                     <BreadcrumbSeparator className='hidden md:block' />
//                                     <BreadcrumbItem className='hidden md:block'>
//                                         <BreadcrumbLink>
//                                             <Link to='/users'>Usuários</Link>
//                                         </BreadcrumbLink>
//                                     </BreadcrumbItem>
//                                     <BreadcrumbSeparator className='hidden md:block' />
//                                     <BreadcrumbItem>
//                                         <BreadcrumbPage>Editando {name}</BreadcrumbPage>
//                                     </BreadcrumbItem>
//                                 </BreadcrumbList>
//                             </Breadcrumb>
//                         </div>
//                     <div className='pr-8'>
//                         <ToggleTheme />
//                     </div>
//                 </header>
//                 <div className='flex flex-1 flex-col  p-4 mt-1 mr-3 ml-3'>
//                     <div className='col-span-2 bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]'>
//                         <Form {...form}>
//                             <form onSubmit={form.handleSubmit(onSubmit)}>
//                                 <div className='flex items-center'>
//                                     <div className='w-1/2 mr-8'>
//                                         <FormField
//                                             control={form.control}
//                                             name='role'
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <FormLabel>Tipo de Usuário</FormLabel>
//                                                         <Select 
//                                                             value={field.value}
//                                                             onValueChange={(value) => field.onChange({
//                                                                 target: { value }
//                                                             })}
//                                                             >
//                                                             <FormControl>
//                                                                 <SelectTrigger>
//                                                                     <SelectValue placeholder='Tipo de Usuário' />
//                                                                 </SelectTrigger>
//                                                             </FormControl>
//                                                             <SelectContent>
//                                                                 <SelectItem value='Admin'>Administrador</SelectItem>
//                                                                 <SelectItem value='user'>Usuario</SelectItem>
//                                                             </SelectContent>
//                                                         </Select>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />
//                                         {/* <FormField
//                                             control={form.control}
//                                             name='role'
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <FormLabel>Tipo de Usuário</FormLabel>
//                                                         <Select 
//                                                             value={field.value}
//                                                             onValueChange={(value) => field.onChange({
//                                                                 target: { value }
//                                                             })}
//                                                             >
//                                                             <FormControl>
//                                                                 <SelectTrigger>
//                                                                     <SelectValue placeholder='Tipo de Usuário' />
//                                                                 </SelectTrigger>
//                                                             </FormControl>
//                                                             <SelectContent>
//                                                                 <SelectItem value='Admin'>Administrador</SelectItem>
//                                                                 <SelectItem value='user'>Usuario</SelectItem>
//                                                             </SelectContent>
//                                                         </Select>
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         /> */}
//                                     </div>
//                                     <div className='w-1/2 mr-8'>
//                                         <FormField
//                                             control={form.control}
//                                             name='name'
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <FormLabel>Name</FormLabel>
//                                                     <Input placeholder='Name' {...field} />
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />
//                                     </div>
//                                     <div className='w-1/2'>
//                                         <FormField
//                                             control={form.control}
//                                             name='mobile'
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <FormLabel>Mobile</FormLabel>
//                                                     <Input placeholder='Mobile' {...field} />
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className='flex items-center mt-5'>
//                                     <div className='w-1/2 mr-8'>
//                                         <FormField
//                                             control={form.control}
//                                             name='password'
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <FormLabel>Alterar a Senha</FormLabel>
//                                                     <Input type='password' placeholder='Senha' {...field} />
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />
//                                     </div>

//                                     <div className='w-1/2'>
//                                         <FormField
//                                             control={form.control}
//                                             name='confirm'
//                                             render={({ field }) => (
//                                                 <FormItem>
//                                                     <FormLabel>Confirmação de Senha</FormLabel>
//                                                     <Input type='password' placeholder='Confirmação' {...field} />
//                                                     <FormMessage />
//                                                 </FormItem>
//                                             )}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className='pt-7'>
//                                     <Button type='submit' 
//                                         className='bg-black text-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:text-white dark:hover:bg-[#23CFCE] dark:hover:text-black'>
//                                         Salvar Alterações
//                                     </Button>
//                                 </div>
//                             </form>    
//                         </Form>
//                     </div>
//                 </div> 
//             </SidebarInset>
//         </>
//     )
// }

