'use client'

import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export const Header = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering theme toggle after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-6 bg-primary-dark/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <img src="/images/lance_white.png" alt="Lance Logo" className="h-12" />
          </Link>
          <div className="w-10 h-10" /> {/* Placeholder for theme toggle */}
        </div>
      </header>
    )
  }

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-6 bg-primary-dark/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <img src="/images/lance_white.png" alt="Lance Logo" className="h-12" />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-white hover:text-white/80"
          title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Monitor className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  )
}
