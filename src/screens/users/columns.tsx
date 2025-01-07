import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Pen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


const userMap = {
    0: 'Admin',
    1: 'Fornecedor',
    2: 'Suporte',
}

export type User = {
    id: string
    name: string
    mobile: string
    role: string
}


export const columns = (setUser: React.Dispatch<React.SetStateAction<User[]>>): ColumnDef<User>[] => [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    className='pl-0 hover:no-underline'
                    variant='link'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Nome</p>
                    <ArrowUpDown className='ml-3 h-4 w-4 text-gray-700 dark:text-white' />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] font-semibold'>{row.original.name}</p>
            )
        }
    },
    {
        accessorKey: 'mobile',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold uppercase'>Celular</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{row.original.mobile}</p>
            )
        }
    },
    {
        accessorKey: 'role',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold uppercase'>Tipo</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] subpixel-antialiased'>{userMap[row.original.role]}</p>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <div className='flex justify-end'>
                    <Link to={`/users/edit/${row.original.id}`}
                        className='items-center justify-center p-3 rounded-md bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE] group'>
                        <Pen className='text-black dark:text-white dark:group-hover:text-black' strokeWidth={2} style={{ 'width': 19, 'height': 19}} />
                    </Link>
                </div>
            )
        },
    },
]
