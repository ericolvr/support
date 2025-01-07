import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MapPin, Pen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export type Supplier = {
    id: string
    name: string
    document: string
    mobile: string
    zipcode: string
    state: string
    city: string
}


export const columns = (setSupplier: React.Dispatch<React.SetStateAction<Supplier[]>>): ColumnDef<Supplier>[] => [
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
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Celular</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] subpixel-antialiased'>{row.original.mobile}</p>
            )
        }
    },
    {
        accessorKey: 'document',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Documento</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{row.original.document}</p>
            )
        }
    },
    {
        accessorKey: 'state',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>UF</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] subpixel-antialiased'>{row.original.state}</p>
            )
        }
    },
    {
        accessorKey: 'city',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Cidade</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px] subpixel-antialiased'>{row.original.city}</p>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${
                encodeURIComponent(
                    row.original.zipcode
                )
            }`

            return (
                <div className='flex justify-end'>
                    <Link to={`/suppliers/edit/${row.original.id}`}
                        className='items-center justify-center p-3 rounded-md bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE] group'>
                        <Pen className='text-black dark:text-white dark:group-hover:text-black' strokeWidth={2} style={{ 'width': 19, 'height': 19}} />
                    </Link>

                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                        className='items-center justify-center p-3 rounded-md bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE] group ml-2'
                    >
                        <MapPin className='text-black dark:text-white dark:group-hover:text-black' strokeWidth={2} style={{ 'width': 21, 'height': 21}} />
                    </a>
                </div>
            )
        },
    },
]

