import { useToast } from '@/hooks/use-toast'
import apiClient from '@/lib/api-client'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface DeleteMemoryDialogProps {
  memoryId: string
  memoryName: string
  open: boolean
  onClose: (memoryId?: string) => void
}

export function DeleteMemoryDialog({
  memoryId,
  memoryName,
  open,
  onClose,
}: DeleteMemoryDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleConfirm = async () => {
    setIsLoading(true)

    try {
      await apiClient.deleteMemory(memoryId)

      toast({
        description:
          'Your memory has been removed from the collection. If you change your mind, remember the good times!',
      })

      onClose(memoryId)
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          'An error occurred while trying to delete the memory. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are You Sure You Want to Delete This Memory&nbsp;
            <span className='italic'>{memoryName}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Once deleted, this memory cannot be recovered. Please confirm if you
            really want to remove it from your collection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClose()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : null}
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
