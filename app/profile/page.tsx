"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Mail, ArrowLeft, Upload, Check, LogOut } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@/components/auth-context"

interface ProfileData {
  // Empty interface as we no longer need notifications
}

export default function ProfilePage() {
  const router = useRouter()
  const { logout, user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  
  // Initial profile data state
  const [profileData, setProfileData] = useState<ProfileData>({})

  // Track original data to detect changes
  const [originalData, setOriginalData] = useState<ProfileData>(profileData)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Check for changes whenever profileData is updated
  useEffect(() => {
    const hasDataChanges = JSON.stringify(profileData) !== JSON.stringify(originalData)
    const hasImageChanges = previewImage !== null
    setHasChanges(hasDataChanges || hasImageChanges)
  }, [profileData, previewImage, originalData])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size (800KB = 800 * 1024 bytes)
      if (file.size > 800 * 1024) {
        toast.error("File size must be less than 800KB")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update original data to match current data
      setOriginalData(profileData)
      if (previewImage) {
        // Here you would typically upload the image to your storage
        // and update the user's profile picture URL
      }
      
      toast.success("Changes saved successfully")
      setHasChanges(false)
    } catch (error) {
      toast.error("Failed to save changes")
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      logout() // Use the real logout from auth context
      router.push('/') // Redirect to home page after logout
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Failed to logout")
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removePhoto = () => {
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6 pt-32">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/dashboard')}
          className="text-slate-400 hover:text-white hover:bg-slate-800 -mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Profile Settings</h1>
            <p className="text-slate-400 mt-2">Manage your account settings and preferences</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className={`${
              hasChanges 
                ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            } transition-colors`}
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full mr-2" />
                Saving...
              </>
            ) : hasChanges ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              'No Changes'
            )}
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="bg-slate-800 border-slate-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Profile Information</CardTitle>
            <CardDescription className="text-slate-400">
              Personal information is synced with your Google account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-start space-x-6">
              <div className="relative group">
                <Avatar className="h-24 w-24 ring-4 ring-blue-500/20 ring-offset-2 ring-offset-slate-900">
                  {previewImage && <AvatarImage src={previewImage} />}
                  <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
                    {previewImage
                      ? "..."
                      : (user?.name
                          ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
                          : "U")}
                  </AvatarFallback>
                </Avatar>
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <Upload className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white">Profile Picture</h3>
                <p className="text-sm text-slate-400">
                  Upload a new profile picture. JPG, GIF or PNG. Max size of 800K
                </p>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={triggerFileInput}
                    className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
                  >
                    Upload New Picture
                  </Button>
                  {previewImage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={removePhoto}
                      className="bg-red-900/20 border-red-800/50 text-red-400 hover:bg-red-900/30 hover:text-red-300"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                  <span className="text-xs text-blue-400">Google Account</span>
                </div>
                <Input
                  id="firstName"
                  placeholder="Ella"
                  className="bg-slate-700/50 border-slate-600 text-slate-300 placeholder:text-slate-500"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                  <span className="text-xs text-blue-400">Google Account</span>
                </div>
                <Input
                  id="lastName"
                  placeholder="Lawler"
                  className="bg-slate-700/50 border-slate-600 text-slate-300 placeholder:text-slate-500"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <span className="text-xs text-blue-400">Google Account</span>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ella@lance.ai"
                    className="bg-slate-700/50 border-slate-600 text-slate-300 pl-10 placeholder:text-slate-500"
                    readOnly
                  />
                </div>
              </div>
              <div className="rounded-lg bg-slate-700/30 border border-slate-600 p-3 text-sm text-slate-400">
                <p>These details are managed through your Google account settings.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Section */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-white">Logout</h3>
              <p className="text-sm text-slate-400">End your current session</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="bg-red-900/20 border-red-800/50 text-red-400 hover:bg-red-900/30 hover:text-red-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 