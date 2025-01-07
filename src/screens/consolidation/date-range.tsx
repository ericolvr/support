import { useEffect, useState } from 'react'
import { AppSidebar } from '@/components/app/app-sidebar'
import { ToggleTheme } from '@/components/toggleTheme'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { DataTable } from './data-table'
import { columns } from './columns'

import { addDays, format, startOfWeek } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon, Filter } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link } from 'react-router-dom'

export function ConsolidationDateRange() {
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

    const [date, setDate] = useState<DateRange | undefined>({
        from: startOfCurrentWeek,
        to: addDays(startOfCurrentWeek, 6), // Define o intervalo de 7 dias (segunda a domingo)
    });

    useEffect(() => {
        console.log(date.from.toISOString(), date.to.toISOString());
        const fetchData = async () => {
            // try {
            //     const response = await fetch(`/api/data?from=${date.from.toISOString()}&to=${date.to.toISOString()}`);
            //     const result = await response.json();
            //     console.log(result);
            // } catch (error) {
            //     console.error('Erro ao buscar dados:', error);
            // }
        }

        // Chama a função fetchData
        fetchData();
    }, [date]); // O efeito será executado sempre que a data mudar

    console.log('startOfCurrentWeek', date)
    
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
                                        <Link to='/consolidation'>Consolidação</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className='hidden md:block' />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Por Data</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className='pr-8'>
                        <ToggleTheme />
                    </div>
                </header>

                <div className='p-4 mt-1 mr-3 ml-3'>
                    <div className='bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]'>
                        <div className="flex flex-row justify-between">
                            <div className="w-full mr-3">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
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
                            </div>

                            <div>
                                <Button className='ml-auto'>
                                    <Filter />
                                </Button>
                            </div>
                        </div>
                        
                        {/* <DataTable columns={columns(setSuppliers)} data={suppliers} /> */}
                    </div>
                </div> 
            </SidebarInset>
        </>
    )
}



// import { useState } from 'react'
// import { AppSidebar } from '@/components/app/app-sidebar'
// import { ToggleTheme } from '@/components/toggleTheme'
// import { 
//     Breadcrumb, 
//     BreadcrumbList, 
//     BreadcrumbItem, 
//     BreadcrumbLink, 
//     BreadcrumbPage, 
//     BreadcrumbSeparator 
// } from '@/components/ui/breadcrumb'
// import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
// import { Separator } from '@radix-ui/react-dropdown-menu'
// import { DataTable } from './data-table'
// import { columns } from './columns'

// import { addDays, format, startOfWeek } from "date-fns"
// import { ptBR } from "date-fns/locale"
// import { Calendar as CalendarIcon, Filter } from "lucide-react"
// import { DateRange } from "react-day-picker"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Link } from 'react-router-dom'


// export function ConsolidationDateRange() {

//     const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

//     const [date, setDate] = useState<DateRange | undefined>({
//         from: startOfCurrentWeek,
//         to: addDays(startOfCurrentWeek, 6), // Define o intervalo de 7 dias (segunda a domingo)
//     })

//     console.log('startOfCurrentWeek', date)
    
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
//                                             <Link to='/consolidation'>Consolidação</Link>
//                                         </BreadcrumbLink>
//                                     </BreadcrumbItem>
//                                     <BreadcrumbSeparator className='hidden md:block' />
//                                     <BreadcrumbItem>
//                                         <BreadcrumbPage>Por Data</BreadcrumbPage>
//                                     </BreadcrumbItem>
//                                 </BreadcrumbList>
//                             </Breadcrumb>
//                         </div>
//                     <div className='pr-8'>
//                         <ToggleTheme />
//                     </div>
//                 </header>

//                 <div className='p-4 mt-1 mr-3 ml-3'>
//                     <div className='bg-white shadow-sm p-10 rounded-md dark:bg-[#292929]'>
//                         <div className="flex flex-row justify-between">
//                             <div className="w-full mr-3">
//                                 <Popover>
//                                     <PopoverTrigger asChild>
//                                         <Button
//                                             id="date"
//                                             variant={"outline"}
//                                             className={cn(
//                                                 "w-full justify-start text-left font-normal",
//                                                 !date && "text-muted-foreground"
//                                             )}
//                                         >
//                                             <CalendarIcon />
//                                             {date?.from ? (
//                                                 date.to ? (
//                                                     <>
//                                                         {format(date.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
//                                                         {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
//                                                     </>
//                                                 ) : (
//                                                     format(date.from, "dd/MM/yyyy", { locale: ptBR })
//                                                 )
//                                             ) : (
//                                                 <span>Escolha uma data</span>
//                                             )}
//                                         </Button>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-auto p-0" align="start">
//                                         <Calendar
//                                             initialFocus
//                                             mode="range"
//                                             defaultMonth={date?.from}
//                                             selected={date}
//                                             onSelect={setDate}
//                                             numberOfMonths={2}
//                                             locale={ptBR}
//                                         />
//                                     </PopoverContent>
//                                 </Popover>
//                             </div>

//                             <div>
//                                 <Button className='ml-auto'>
//                                     <Filter />
//                                 </Button>
//                             </div>
//                         </div>
                        
//                         {/* <DataTable columns={columns(setSuppliers)} data={suppliers} /> */}
//                     </div>
//                 </div> 
//             </SidebarInset>
//         </>
//     )
// }
