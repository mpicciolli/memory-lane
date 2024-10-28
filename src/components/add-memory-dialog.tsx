import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/hooks/use-toast'
import apiClient from '@/lib/api-client'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Memory } from '@/lib/models/Memory'
import { type MemoryDto } from '@/lib/models/MemoryDto'

interface AddMemoryDialogProps {
  memory?: MemoryDto
  open: boolean
  onClose: (memory?: Memory) => void
}

export function AddMemoryDialog({
  memory,
  open,
  onClose,
}: AddMemoryDialogProps) {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(20).max(500),
    date: z
      .date()
      .max(
        new Date(),
        'The memory date cannot be in the future. Please select a valid date.'
      ),
  })

  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      date: undefined,
    },
  })

  useEffect(() => {
    if (memory) {
      form.reset({
        ...memory,
        date: parse(memory.timestamp, 'yyyy-MM-dd', new Date()),
      })
    }
  }, [memory])

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const memoryData = {
      name: values.name,
      description: values.description,
      timestamp: format(values.date, 'yyyy-MM-dd'),
    }

    setIsLoading(true)

    try {
      if (memory?.id) {
        await apiClient.updateMemory(memory.id, memoryData)
        toast({
          description:
            "Hooray! Your memory has been updated successfully! 🎉 Now it's even more unforgettable!",
        })
      } else {
        await apiClient.createMemory(memoryData)
        toast({
          description:
            'Hooray!  Your memory has been saved successfully! 🎉 Thank you for sharing this precious moment with us.',
        })
      }
      onClose(memoryData)
      form.reset()
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          'An error occurred while saving your memory. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    form.reset()
    form.clearErrors()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {memory ? 'Edit your memory' : 'Add a Memory'}
          </DialogTitle>
          <DialogDescription>
            {memory
              ? 'Take a moment to revisit and refine your memory. Update the details to keep it just as you remember it, ensuring that every moment is perfectly captured.'
              : 'Preserve this special memory for the future! Fill in the details below, and let’s make it part of your unforgettable collection.'}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='space-y-8'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Description' {...field} rows={8} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Date of your memory</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => date > new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type='button'
                  className='w-full'
                  variant='outline'
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
