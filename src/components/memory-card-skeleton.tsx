import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from './ui/skeleton'

export function MemoryCardSkeleton() {
  return (
    <Card>
      <CardContent className='p-4'>
        <Skeleton className='h-4 w-1/2 mb-2' />
        <Skeleton className='h-4 w-3/4 mb-2' />
        <Skeleton className='h-4 w-3/4 mb-2' />
      </CardContent>
    </Card>
  )
}
