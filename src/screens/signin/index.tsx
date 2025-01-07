import { useState, useContext } from 'react'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'
import { 
    Card, 
    CardContent, 
    CardHeader
} from '@/components/ui/card'

import ApiSignin from './service'
import { AuthContext } from '@/context/general'
import Storage from '@/storage'
import BgImage from '../../assets/otp.svg'

export function SignIn() {
    const navigate = useNavigate()
    const { HandleUserData } = useContext(AuthContext)
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            'mobile': mobile,
            'password': password 
        }

        const response = await ApiSignin.GetToken({ data })    
        if (response['access_token']) {
            Storage.StoreUserData(response) 

            HandleUserData(response)

            if (response['role'] === '0') {
                navigate("/dashboard")
            } else if (response['role'] === '1') {
                navigate("/appointments")
            }
        } else {
            console.log('error')
        }
    }

    return (
        <main className='flex h-screen w-full'>
            <div className='bg-[#F0F0F0] dark:bg-[#212121] w-full h-full flex items-center justify-center'>
                <img src={BgImage} alt="My SVG" className=' w-[50%] h-[50%]' />
            </div>

            <section className='flex bg-white max-w-3xl w-full dark:bg-[#212121]  justify-center items-center'>
                <Card className='w-[360px] dark:bg-[#292929]'>
                    <CardHeader />
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor='mobile' className='pb-1'>celular</Label>
                                <InputMask
                                    mask='(99) 99999-9999'
                                    placeholder='celular com prefixo' 
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                >
                                    {(inputProps) => <Input {...inputProps} />}  
                                </InputMask>
                            </div>

                            <div className='mt-7'>
                                <Label htmlFor='mobile' className='pb-1'>sua senha</Label>
                                <Input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id='password' 
                                    type='password' 
                                    placeholder='digite a senha' 
                                />
                            </div>
                            <Button className='mt-9 w-full dark:bg-[#212121] dark:hover:bg-[#23CFCE] text-white'>Entrar</Button>
                        </form>
                    </CardContent>
                </Card>        
            </section>
        </main>
    )
}
