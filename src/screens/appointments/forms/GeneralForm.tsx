import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

 import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
 
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// Interface para o tipo de serviço
interface ServiceItem {
  id: number
  service: string
  quantity: number
}

export function GeneralForm() {
	const [date, setDate] = useState<Date>()

  const [services, setServices] = useState<ServiceItem[]>([
    { id: 1, service: '', quantity: 0 }
  ])

  // Adiciona novo campo de serviço
  const addServiceField = () => {
    setServices([
      ...services,
      { id: services.length + 1, service: '', quantity: 0 }
    ])
  }

  // Remove um campo de serviço
  const removeServiceField = (id: number) => {
    setServices(services.filter(item => item.id !== id))
  }

  // Atualiza os valores dos campos
  const updateService = (id: number, field: 'service' | 'quantity', value: string | number) => {
    setServices(services.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value }
      }
      return item
    }))
  }

  return (
    <div className='space-y-4'>
      {services.map((item) => (
        <div key={item.id} className='items-center'>

			<div className='grid grid-cols-12'>
				<div className='col-span-6 mr-6'>
					<label htmlFor={`input-${item.id}`} className='block text-[13px] mb-1  text-gray-400'>
						Status
					</label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={'outline'}
								className={cn(
								'w-full justify-start text-left font-normal',
								!date && 'text-muted-foreground'
								)}
							>
								<CalendarIcon />
								{date ? format(date, 'PPP') : <span>Data de atendimento</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0'>
							<Calendar
								mode='single'
								selected={date}
								onSelect={setDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>

				<div className='col-span-6'>
					<label htmlFor={`input-${item.id}`} className='block text-[13px] mb-1  text-gray-400'>
						Status
					</label>
					<Select
						value={item.service}
						onValueChange={(value) => updateService(item.id, 'service', value)}
					>
						<SelectTrigger>
							<SelectValue placeholder='Selecione' />
						</SelectTrigger>
						<SelectContent>
						<SelectItem value='1'>Enviado</SelectItem>
						<SelectItem value='2'>Aprovado</SelectItem>
						<SelectItem value='3'>Com Divergência</SelectItem>
						<SelectItem value='4'>Faltam Documentos</SelectItem>
						<SelectItem value='6'>Emitir Nota</SelectItem>
						<SelectItem value='6'>Nota Emitida</SelectItem>
						<SelectItem value='7'>Pago</SelectItem>
						</SelectContent>
					</Select>
				</div>

			</div>
        </div>
      ))}

      <Button onClick={addServiceField} className='mt-6'>
        Adicionar
      </Button>
    </div>
  )
} 