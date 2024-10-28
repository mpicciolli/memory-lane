import avatar from '@/assets/images/avatar.jpeg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function UserInfo() {
  return (
    <Card className='mb-8'>
      <CardHeader className='flex flex-row items-center gap-4'>
        <Avatar className='h-20 w-20'>
          <AvatarImage src={avatar} alt='Sophie Miles' />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <div>
          <h1 className='text-2xl font-bold'>Sophie Miles</h1>
          <p className='text-muted-foreground'>
            Passionate traveler sharing my journey through photos and stories
            from around the world. 🌍✨ Join me on adventures full of culture,
            breathtaking landscapes, and unforgettable moments!
          </p>
        </div>
      </CardHeader>
      <CardContent className='flex justify-around text-center'></CardContent>
    </Card>
  )
}
