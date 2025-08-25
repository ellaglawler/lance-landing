"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Play, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoModalProps {
  videoUrl: string
  thumbnailUrl?: string
  title?: string
  duration?: string
  children?: React.ReactNode
  className?: string
  variant?: 'thumbnail' | 'button' | 'floating'
}

export function VideoModal({
  videoUrl,
  thumbnailUrl,
  title = "Watch How Easy It Is to Use Lance",
  duration = "0:51",
  children,
  className,
  variant = 'thumbnail'
}: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    // Track analytics when video is opened
    if (open) {
      // You can add analytics tracking here
      console.log('Video modal opened')
    }
  }

  const renderThumbnail = () => (
    <div className="relative group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center">
                <Play className="w-8 h-8 ml-1" />
              </div>
              <p className="text-sm font-medium">Lance Demo</p>
              <p className="text-xs opacity-80">Click to watch</p>
            </div>
          </div>
        )}
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="w-8 h-8 ml-1 text-gray-900" />
          </div>
        </div>
      </div>
      
      {/* Video info */}
      <div className="mt-3 text-center">
        <p className="text-sm font-medium text-gray-300">{title}</p>
        <p className="text-xs text-gray-400">({duration})</p>
      </div>
    </div>
  )

  const renderButton = () => (
    <button className={cn(
      "inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200",
      className
    )}>
      <Play className="w-4 h-4" />
      <span>Watch Demo ({duration})</span>
    </button>
  )

  const renderFloating = () => (
    <button className={cn(
      "fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105",
      "hidden lg:flex", // Only show on desktop
      className
    )}>
      <Play className="w-4 h-4" />
      <span className="text-sm font-medium">How Lance Works ({duration})</span>
    </button>
  )

  const renderTrigger = () => {
    switch (variant) {
      case 'button':
        return renderButton()
      case 'floating':
        return renderFloating()
      case 'thumbnail':
      default:
        return renderThumbnail()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || renderTrigger()}
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-0">
        <div className="relative">
          {/* Video container */}
          <div className="relative aspect-video">
            <iframe
              src={`${videoUrl}?autoplay=1&muted=1&controlsVisibleOnLoad=false&playbar=false&fullscreenButton=false&volume=0`}
              title={title}
              className="w-full h-full rounded-lg"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
          
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-4 -right-4 w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Floating video button component for desktop
export function FloatingVideoButton({ videoUrl }: { videoUrl: string }) {
  return (
    <VideoModal
      videoUrl={videoUrl}
      variant="floating"
      title="How Lance Works"
      duration="0:51"
    />
  )
}
