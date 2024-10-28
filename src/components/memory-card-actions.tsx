import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import { AddMemoryDialog } from './add-memory-dialog'
import { DeleteMemoryDialog } from './delete-memory-dialog'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { MemoryDto } from '@/lib/models/MemoryDto'
import { Memory } from '@/lib/models/Memory'

interface MemoryCardActionsProps {
  memory: MemoryDto
  onUpdate: () => void
  onRemove: () => void
}

export function MemoryCardActions({
  memory,
  onUpdate,
  onRemove,
}: MemoryCardActionsProps) {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleEditDialogClose = (updatedMemory?: Memory) => {
    if (updatedMemory) {
      onUpdate()
    }
    setEditDialogOpen(false)
  }

  const handleDeleteDialogClose = (memoryId?: string) => {
    if (memoryId) {
      onRemove()
    }
    setDeleteDialogOpen(false)
  }

  return (
    <>
      <AddMemoryDialog
        open={isEditDialogOpen}
        memory={memory}
        onClose={handleEditDialogClose}
      />
      <DeleteMemoryDialog
        memoryId={memory.id}
        memoryName={memory.name}
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost'>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
              Edit my memory
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
              <span className='text-destructive'>Delete my memory</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
