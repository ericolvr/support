import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Pager } from '@/components/app/pagination'


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]) // State for filters

    const toggleRowExpansion = (rowId: number) => {
        setExpandedRows((prev) => {
            const newExpandedRows = new Set(prev)
            if (newExpandedRows.has(rowId)) {
                newExpandedRows.delete(rowId)
            } else {
                newExpandedRows.add(rowId)
            }
            return newExpandedRows
        })
    }

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters, 
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <>
            <div>
                <div className='flex justify-between items-center pb-4'>
                    <Input
                        placeholder='Pesquisar por Uniorg ...'
                        value={(table.getColumn('uniorg')?.getFilterValue() as string) ?? ''}
                        onChange={(event) =>
                            table.getColumn('uniorg')?.setFilterValue(event.target.value) 
                        }
                        className='max-w-sm ml-2 mt-1 mb-2'
                    />

                    <div className='flex items-center space-x-6'>
                        <Link to='/tickets/add' className='bg-black text-white text-sm font-semibold hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE] dark:hover:text-black py-2.5 p-5 rounded-lg transition-colors duration-400'>
                            <span>Adicionar</span> 
                        </Link>
                    </div>
                </div>

                <Table className='mt-4'>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <TableRow
                                        data-state={row.getIsSelected() && 'selected'}
                                        onClick={() => toggleRowExpansion(row.index)}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            <div className='flex justify-end'>
                                                <Button variant='link' className='p-2'>
                                                    {expandedRows.has(row.index) ? <ArrowUp /> : <ArrowDown />}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    {expandedRows.has(row.index) && (
                                        <TableRow>
                                            <TableCell colSpan={8} className='w-full bg-[#F2F2F3] dark:bg-[#212121]'>
                                                <div className="">
                                                    <Card className='p-2 dark:bg-[#292929]'>
                                                        <CardHeader>
                                                            <CardTitle className='text-lg'>Serviços</CardTitle>
                                                            <CardDescription>Lista de serviços a serem executados no atendimento</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                            {row.original.items.map((item) => (
                                                                <div className='flex justify-between'>
                                                                    <p className='pb-3 text-[15px]'>{item.service.name}</p>
                                                                    <p className='text-[15px]'>{item.service_quantity}</p>
                                                                </div>
                                                            ))}
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    Vazio
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pager table={table} />
        </>
    )
}

