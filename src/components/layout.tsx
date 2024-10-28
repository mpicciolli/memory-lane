interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <main className='container mx-auto max-w-2xl p-4'>{children}</main>
}
