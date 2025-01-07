import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Pen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


export type Ticket = {
    id: string
    client: string
    uniorg: string
    supplier: number
    ticket_date: string
    items: string
    status: number
}

const statusMap = { 
    1: '1 - Aguarda Aprovação',
    2: '2 - Aprovado Pelo Gestor',
    3: '3 - Reprovado Pelo Gestor',
    4: '4 - Atendimento Aceito',
    5: '5 - Atendimento Iniciciado', 
    6: '6 - Finalizado - Para Conferência',
    7: '7 - Atendimento Com Erros',
    8: '8 - Retornar à Agência',
    9: '9 - Finalizado - Sem Pendência',
    10: '10 - Divergência nos Itens',
    11: '11 - Pagamento Aprovado',
    12: '12 - Nota Emitida',
    13: '13 - Foi Pago'
}


export const columns = (setTicket: React.Dispatch<React.SetStateAction<Ticket[]>>): ColumnDef<Ticket>[] => [
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
        accessorKey: 'supplier',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Fornecedor</p>    
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{row.original.supplier.name}</p>
            )
        }
    },
    {
        accessorKey: 'status',
        header: () => {
            return (
                <p className='text-black dark:text-white text-[12px] font-extrabold text-xs uppercase'>Status</p>    
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-black dark:text-white text-[14.5px]'>{statusMap[row.original.status]}</p>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return (
                <div className='flex justify-end'>
                    <Link to={`/tickets/edit/${row.original.id}`}
                        className='items-center justify-center p-3 rounded-md bg-white hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE] group'>
                        <Pen className='text-black dark:text-white dark:group-hover:text-black' strokeWidth={2} style={{ 'width': 19, 'height': 19}} />
                    </Link>
                </div>
            )
        }
    }
]

