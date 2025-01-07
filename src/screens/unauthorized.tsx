import { Link } from 'react-router-dom'

import BgImage from '@/assets/error.svg'

export function Unauthorized() {
    
    return (
        <main className='flex h-screen w-full'>
            <div className='bg-[#F0F0F0] w-full h-full flex items-center justify-center'>
                <img src={BgImage} alt="My SVG" className=' w-[50%] h-[50%]' />
            </div>

            <section className='flex bg-white max-w-3xl w-full  justify-center items-center'>
                <div className='w-[500px]'>
                    <h1 className='text-[20px] font-bold mb-8'>Você não tem autorização para ver essa página</h1>
                    <Link className='bg-black p-4 rounded-md text-white' to='/appointments'>Clique para voltar</Link>
                </div>        
            </section>
        </main>
    )
}
