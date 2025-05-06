'use client'

import AuthButton from '@/components/AuthButton'
import Header from '@/components/Header'
import ThemeToggle from '@/components/ThemeToggle'
import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase/client'

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data?.session)
    })
  }, [])

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      {/* Header + Auth */}
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          {isLoggedIn && <AuthButton />}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex max-w-4xl flex-1 flex-col gap-20 px-3">
        <Header />

        <main className="flex flex-1 flex-col gap-6">
          {isLoggedIn ? (
            <iframe
              src="https://flowiseai-railway-production-378e.up.railway.app/"
              style={{
                width: '100%',
                height: '80vh',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
              title="Flowise"
            />
          ) : (
            <p className="text-lg text-center text-gray-500">
              Please log in to access the flow builder.
            </p>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
        <p className="mb-6">
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
        <ThemeToggle />
      </footer>
    </div>
  )
}
