"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { getProfile, addSwapRequest, type Profile } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Star, User, MapPin, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ViewProfilePage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [offeredSkill, setOfferedSkill] = useState("")
  const [wantedSkill, setWantedSkill] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (params.id) {
      const userProfile = getProfile(params.id)
      if (userProfile) {
        setProfile(userProfile)
      } else {
        router.push("/")
      }
    }
  }, [user, params.id, router])

  const handleSendRequest = async () => {
    if (!user || !profile || !offeredSkill || !wantedSkill) return

    setSending(true)

    try {
      addSwapRequest({
        requester_id: user.id,
        requested_id: profile.id,
        offered_skill: offeredSkill,
        wanted_skill: wantedSkill,
        message,
        status: "pending",
      })

      toast({
        title: "Success",
        description: "Swap request sent successfully!",
      })
      setDialogOpen(false)
      setOfferedSkill("")
      setWantedSkill("")
      setMessage("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send swap request",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  if (!user || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary">Profile</h1>
            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.profile_photo || "/placeholder.svg?height=80&width=80"} />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                {profile.location && (
                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </div>
                )}
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-medium ml-1">{profile.rating.toFixed(1)}</span>
                  <span className="text-gray-500 ml-1">({profile.rating_count} reviews)</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Availability */}
            {profile.availability && (
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <h3 className="font-medium">Availability</h3>
                </div>
                <p className="text-gray-600">{profile.availability}</p>
              </div>
            )}

            {/* Skills Offered */}
            <div>
              <h3 className="font-medium mb-3">Skills Offered</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills_offered.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skills Wanted */}
            <div>
              <h3 className="font-medium mb-3">Skills Wanted</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills_wanted.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Request Swap Button */}
            <div className="pt-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    Request Skill Swap
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Request Skill Swap with {profile.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="offered-skill">Skill You Offer</Label>
                      <Select value={offeredSkill} onValueChange={setOfferedSkill}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a skill you can teach" />
                        </SelectTrigger>
                        <SelectContent>
                          {profile.skills_wanted.map((skill, index) => (
                            <SelectItem key={index} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="wanted-skill">Skill You Want</Label>
                      <Select value={wantedSkill} onValueChange={setWantedSkill}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a skill you want to learn" />
                        </SelectTrigger>
                        <SelectContent>
                          {profile.skills_offered.map((skill, index) => (
                            <SelectItem key={index} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell them why you'd like to swap skills..."
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={handleSendRequest}
                      disabled={!offeredSkill || !wantedSkill || sending}
                      className="w-full"
                    >
                      {sending ? "Sending..." : "Send Request"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
