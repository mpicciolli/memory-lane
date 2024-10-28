import { Toaster } from '@/components/ui/toaster'
import './App.css'
import Layout from './components/layout'
import { MemoryLane } from './components/memory-lane'
import UserInfo from './components/user-info'

function App() {
  return (
    <Layout>
      <Toaster />
      <UserInfo></UserInfo>
      <MemoryLane></MemoryLane>
    </Layout>
  )
}

export default App
