"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { getProfile, updateProfile, type Profile } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { X, Plus, User, Save, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [availability, setAvailability] = useState("")
  const [experienceLevel, setExperienceLevel] = useState<"beginner" | "intermediate" | "advanced" | "expert">(
    "beginner",
  )
  const [isPublic, setIsPublic] = useState(true)
  const [skillsOffered, setSkillsOffered] = useState<string[]>([])
  const [skillsWanted, setSkillsWanted] = useState<string[]>([])
  const [newOfferedSkill, setNewOfferedSkill] = useState("")
  const [newWantedSkill, setNewWantedSkill] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    const userProfile = getProfile(user.id)
    if (userProfile) {
      setProfile(userProfile)
      setName(userProfile.name)
      setLocation(userProfile.location || "")
      setBio(userProfile.bio || "")
      setAvailability(userProfile.availability)
      setExperienceLevel(userProfile.experience_level)
      setIsPublic(userProfile.is_public)
      setSkillsOffered(userProfile.skills_offered)
      setSkillsWanted(userProfile.skills_wanted)
    }
  }, [user, router])

  const addOfferedSkill = () => {
    if (newOfferedSkill.trim() && !skillsOffered.includes(newOfferedSkill.trim())) {
      setSkillsOffered([...skillsOffered, newOfferedSkill.trim()])
      setNewOfferedSkill("")
    }
  }

  const removeOfferedSkill = (skill: string) => {
    setSkillsOffered(skillsOffered.filter((s) => s !== skill))
  }

  const addWantedSkill = () => {
    if (newWantedSkill.trim() && !skillsWanted.includes(newWantedSkill.trim())) {
      setSkillsWanted([...skillsWanted, newWantedSkill.trim()])
      setNewWantedSkill("")
    }
  }

  const removeWantedSkill = (skill: string) => {
    setSkillsWanted(skillsWanted.filter((s) => s !== skill))
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)

    try {
      updateProfile(user.id, {
        name,
        location: location || undefined,
        bio: bio || undefined,
        availability,
        experience_level: experienceLevel,
        is_public: isPublic,
        skills_offered: skillsOffered,
        skills_wanted: skillsWanted,
      })

      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/")} className="hover:bg-blue-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push("/dashboard")} className="hover:bg-purple-50">
                Dashboard
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="hover:bg-red-50 bg-transparent">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <User className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">Edit Your Profile</CardTitle>
                <p className="text-blue-100">Make your profile stand out to potential skill partners</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., San Francisco, CA"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell others about yourself, your background, and what you're passionate about..."
                  rows={4}
                  className="border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                    Experience Level
                  </Label>
                  <Select value={experienceLevel} onValueChange={(value: any) => setExperienceLevel(value)}>
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability" className="text-sm font-medium text-gray-700">
                    Availability
                  </Label>
                  <Input
                    id="availability"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="e.g., Weekends, Evenings after 6 PM"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Skills & Interests</h3>

              {/* Skills Offered */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Skills I Can Teach
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={newOfferedSkill}
                    onChange={(e) => setNewOfferedSkill(e.target.value)}
                    placeholder="Add a skill you can teach"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addOfferedSkill())}
                    className="flex-1 h-12 border-2 border-gray-200 focus:border-green-500"
                  />
                  <Button type="button" onClick={addOfferedSkill} className="bg-green-600 hover:bg-green-700 px-6">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillsOffered.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 border-green-200"
                    >
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-green-900"
                        onClick={() => removeOfferedSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Skills Wanted */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Skills I Want to Learn
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={newWantedSkill}
                    onChange={(e) => setNewWantedSkill(e.target.value)}
                    placeholder="Add a skill you want to learn"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addWantedSkill())}
                    className="flex-1 h-12 border-2 border-gray-200 focus:border-blue-500"
                  />
                  <Button type="button" onClick={addWantedSkill} className="bg-blue-600 hover:bg-blue-700 px-6">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillsWanted.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 border-blue-200"
                    >
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-blue-900"
                        onClick={() => removeWantedSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Privacy Settings</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-base font-medium text-gray-900">Public Profile</Label>
                  <p className="text-sm text-gray-600">Allow others to find and contact you for skill swaps</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {saving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving Profile...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Save className="h-5 w-5 mr-2" />
                    Save Profile
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
