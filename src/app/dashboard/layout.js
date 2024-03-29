import DashboardLayoutWrapper from '@/components/DashboardLayoutWrapper'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <>
      <DashboardLayoutWrapper>
        {children}
      </DashboardLayoutWrapper>
    </>
  )
}
