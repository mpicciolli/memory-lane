import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MemoryDto } from '@/lib/models/MemoryDto'
import { format, parse, isValid } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { MemoryCardActions } from './memory-card-actions'

interface MemoryCardProps {
  memory: MemoryDto
  onUpdate: () => void
  onRemove: () => void
}

export function MemoryCard({ memory, onUpdate, onRemove }: MemoryCardProps) {
  const parsedDate = parse(memory.timestamp, 'yyyy-MM-dd', new Date())
  const formattedDate = isValid(parsedDate)
    ? format(parsedDate, 'PPP')
    : 'Invalid date'

  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle>
          <div className='flex justify-between items-center'>
            <span>{memory.name}</span>
            <MemoryCardActions
              memory={memory}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          </div>
        </CardTitle>
        <CardDescription>
          <CalendarIcon className='inline-block mr-2 h-4 w-4' />
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{memory.description}</p>
      </CardContent>
    </Card>
  )
}
