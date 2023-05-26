import './globals.css';
import { Inter, Nunito } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import ClientOnly from "./components/ClientOnly";
import RegisterModel from './components/Models/RegisterModel';
import ToasterProvider from './providers/ToasterProvider';
import LoginModel from './components/Models/LoginModel';
import getCurrentUser from './actions/getCurrentUser';


// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OJnI',
  description: 'Generated by create next app',
}

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModel />
          <LoginModel />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
