import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, Navigate } from "react-router-dom";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pager } from "@/components/app/pagination";

import { addDays, format, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // State for filters

  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

  // Formatação das datas para o formato DD-MM-YYYY (esperado no backend)
  const formattedFrom = format(startOfCurrentWeek, 'dd-MM-yyyy')
  const formattedTo = format(addDays(startOfCurrentWeek, 6), 'dd-MM-yyyy')

  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfCurrentWeek,
    to: addDays(startOfCurrentWeek, 6), // Define o intervalo de 7 dias (segunda a domingo)
  });

    const toggleRowExpansion = (rowId: number) => {
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev);
      if (newExpandedRows.has(rowId)) {
        newExpandedRows.delete(rowId);
      } else {
        newExpandedRows.add(rowId);
      }
      return newExpandedRows;
    });
  };

  const [filteredData, setFilteredData] = useState<TData[]>([])

  const table = useReactTable({
    data: filteredData.length ? filteredData : data, // Usa os dados filtrados se houver
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
  });

  const getFilteredData = () => {
    if (date?.from && date?.to) {
    const formattedFrom = format(date.from, "dd-MM-yyyy");
    const formattedTo = format(date.to, "dd-MM-yyyy");

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/tickets/date?from_date=${formattedFrom}&to_date=${formattedTo}`
        );
        const result = await response.json();
        setFilteredData(result)
        console.log(result);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center pb-4">
          <Input
            placeholder="Pesquisar por Uniorg ..."
            value={
              (table.getColumn("uniorg")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("uniorg")?.setFilterValue(event.target.value)
            }
            className="w-1/3 ml-1 mt-1 mb-2"
          />

          <Input
            placeholder="Pesquisar por Cliente ..."
            value={
              (table.getColumn("client")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("client")?.setFilterValue(event.target.value)
            }
            className="w-1/3 mt-1 mb-2"
          />

          <div className="flex items-center space-x-6">
            <Link
              to="/appointments/add"
              className="bg-black text-white text-sm font-semibold hover:bg-[#23CFCE] dark:bg-[#212121] dark:hover:bg-[#23CFCE] dark:hover:text-black py-2.5 p-5 rounded-lg transition-colors duration-400"
            >
              <span>Adicionar</span>
            </Link>
          </div>
        </div>

        <div className="w-1/4 ml-1 mb-10 flex flex-row justify-between">
          <Popover> 
            <PopoverTrigger asChild>
              <Button
                id="date"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                      {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
                    </>
                  ) : (
                    format(date.from, "dd/MM/yyyy", { locale: ptBR })
                  )
                ) : (
                  <span>Escolha uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>

          <Button 
            onClick={getFilteredData}
            className='ml-10'>
              <Filter />
          </Button>
        </div>

        <Table className="mt-4">
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
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => toggleRowExpansion(row.index)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex justify-end">
                        <Button variant="link" className="p-2">
                          {expandedRows.has(row.index) ? (
                            <ArrowUp />
                          ) : (
                            <ArrowDown />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {expandedRows.has(row.index) && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="w-full bg-[#F2F2F3] dark:bg-[#212121]"
                      >
                        <div className="">
                          <Card className="p-2 dark:bg-[#292929]">
                            <CardHeader>
                              <CardTitle className="text-lg">
                                Serviços
                              </CardTitle>
                              <CardDescription>
                                Lista de serviços a serem executados no
                                atendimento
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              {row.original.items.map((item) => (
                                <div className="flex justify-between">
                                  <p className="pb-3 text-[15px]">
                                    {item.service.name}
                                  </p>
                                  <p className="text-[15px]">
                                    {item.service_quantity}
                                  </p>
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Vazio
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pager table={table} />
    </>
  );
}
