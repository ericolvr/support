import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Pen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


export type Service = {
    id: string
    name: string
    code: string
    price: string
    description: string
}


export const columns = (setService: React.Dispatch<React.SetStateAction<Service[]>>): ColumnDef<Service>[] => [
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
        accessorKey: 'code',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Código</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{row.original.code}</p>
            )
        }
    },

    {
        accessorKey: 'price',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Valor R$</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{parseFloat(row.original.price).toFixed(2)}</p>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <div className='flex justify-end'>
                    <Link to={`/services/edit/${row.original.id}`}
                        className='items-center justify-center p-3 rounded-md bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE] group'>
                        <Pen className='text-black dark:text-white dark:group-hover:text-black' strokeWidth={2} style={{ 'width': 19, 'height': 19}} />
                    </Link>
                </div>
            )
        },
    }
]

