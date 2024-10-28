import { Button } from '@/components/ui/button'
import apiClient from '@/lib/api-client'
import { Loader2, Plus, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AddMemoryDialog } from './add-memory-dialog'
import { MemoryCard } from './memory-card'
import { MemoryCardSkeleton } from './memory-card-skeleton'
import { type Memory } from '@/lib/models/Memory'
import { type MemoryDto } from '@/lib/models/MemoryDto'

export function MemoryLane() {
  const [isAddMemoryDialogOpen, setIsAddMemoryDialogOpen] =
    useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [memories, setMemories] = useState<MemoryDto[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMemories()
  }, [])

  const fetchMemories = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await apiClient.getMemories()
      setMemories(data.memories)
    } catch (error) {
      setError('Failed to fetch memories. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDialogClose = (memory?: Memory) => {
    if (memory) {
      fetchMemories()
    }
    setIsAddMemoryDialogOpen(false)
  }

  const handleMemoryChange = () => {
    fetchMemories()
  }

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <div className='flex justify-between my-4 items-center'>
        {memories.length ? (
          <>
            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
              My Memory Lane
            </h1>
            <Button
              onClick={() => setIsAddMemoryDialogOpen(true)}
              variant='outline'
            >
              <Plus />
            </Button>
          </>
        ) : (
          ''
        )}
      </div>
      <AddMemoryDialog
        open={isAddMemoryDialogOpen}
        onClose={handleDialogClose}
      />
      {isLoading ? (
        <div className='space-y-4'>
          {[...Array(5)].map((_, index) => (
            <MemoryCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div className='text-destructive'>{error}</div>
      ) : memories.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-[50vh] text-center'>
          <h2 className='text-2xl font-bold mb-2'>No Memories</h2>
          <p className='text-muted-foreground mb-4'>
            Start adding your precious memories now!
          </p>
          <Button onClick={() => setIsAddMemoryDialogOpen(true)}>
            <PlusCircle className='mr-2 h-4 w-4' />
            Add a Memory
          </Button>
        </div>
      ) : (
        memories.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            onUpdate={handleMemoryChange}
            onRemove={handleMemoryChange}
          />
        ))
      )}
      {isLoading && (
        <div className='flex justify-center items-center mt-4'>
          <Loader2 className='h-6 w-6 animate-spin' />
        </div>
      )}
    </div>
  )
}
