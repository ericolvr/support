import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MapPin, Pen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


export type Appointment = {
    id: string
    client: string
    uniorg: string
    supplier: number
    ticket_date: string
    items: string
}


export const columns = (setAppointment: React.Dispatch<React.SetStateAction<Appointment[]>>): ColumnDef<Appointment>[] => [
    {
        accessorKey: 'id',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Protocolo</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] font-bold'>{row.original.id}</p>
            )
        }
    },
    {
        accessorKey: 'ticket_date',
        header: ({ column }) => {
            return (
                <Button
                    className='pl-0 hover:no-underline'
                    variant='link'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Data</p>
                    <ArrowUpDown className='ml-3 h-4 w-4 text-gray-700 dark:text-white' />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{row.original.ticket_date}</p>
            )
        }
    },
    {
        accessorKey: 'client',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Cliente</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{row.original.client}</p>
            )
        }
    },
    {
        accessorKey: 'uniorg',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Uniorg</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{row.original.uniorg}</p>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <div className='flex justify-end'>
                    <Link to={`/appointments/edit/${row.original.id}`}
                        className='items-center justify-center p-3 rounded-md bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE] group'>
                        <Pen className='text-black dark:text-white dark:group-hover:text-black' strokeWidth={2} style={{ 'width': 19, 'height': 19}} />
                    </Link>
                </div>
            )
        },
    }
]
