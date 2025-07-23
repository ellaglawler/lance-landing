'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const Header = () => {
  // TODO: Replace with real auth logic
  const [isLoggedIn] = useState(false)
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-6 bg-primary-dark/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <img src="/images/lance_white.png" alt="Lance Logo" className="h-12" />
        </Link>
        <div>
          {isLoggedIn ? (
            <Avatar className="ring-2 ring-blue-500/30">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-blue-600 text-white font-bold">U</AvatarFallback>
            </Avatar>
          ) : (
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
              onClick={() => router.push('/app/onboarding/')}
            >
              Sign In / Sign Up
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
