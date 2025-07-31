'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useRouter } from 'next/navigation'
import { useAuth } from './auth-context';
import { Settings } from 'lucide-react'

export const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Time-based greeting
  let greeting = 'Good Morning';
  if (typeof window !== 'undefined') {
    const hour = new Date().getHours();
    if (hour >= 18) greeting = 'Good Evening';
    else if (hour >= 12) greeting = 'Good Afternoon';
    else greeting = 'Good Morning';
  }
  const firstName = user?.name ? user.name.split(' ')[0] : '';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-6 bg-primary-dark/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <img src="/images/lance_white.png" alt="Lance Logo" className="h-12" />
        </Link>
        {/* Centered greeting if logged in */}
        {isAuthenticated && (
          <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold text-white select-none">
            {greeting}{firstName ? ` ${firstName}` : ''}
          </div>
        )}
        <div className="flex items-center gap-8">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center">
          </nav>
          {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Avatar 
              className="ring-4 ring-blue-500/20 ring-offset-2 ring-offset-slate-900 cursor-pointer hover:ring-blue-500/40 transition-all"
              onClick={() => router.push('/profile')}
            >
              {user?.previewImage && <AvatarImage src={user.previewImage} />}
              <AvatarFallback className="bg-blue-600 text-white font-bold">
                {user?.name
                  ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
              onClick={() => router.push('/onboarding/')}
            >
              Sign In / Sign Up
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
