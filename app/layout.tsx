import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <AuthSessionProvider>
            <NotificationProvider>
              <NavBar />
              <Notification />
              <main className="flex-1">{children}</main>
            </NotificationProvider>
          </AuthSessionProvider>
        </div>
      </body>
    </html>
  )
}