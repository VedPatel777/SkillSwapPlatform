"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { getProfiles, type Profile } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Search, MapPin, Clock, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function HomePage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([])

  useEffect(() => {
    const allProfiles = getProfiles().filter((p) => p.id !== user?.id && p.is_public)
    setProfiles(allProfiles)
    setFilteredProfiles(allProfiles)
  }, [user])

  useEffect(() => {
    if (searchTerm) {
      const filtered = profiles.filter(
        (profile) =>
          profile.skills_offered.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
          profile.skills_wanted.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.location?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredProfiles(filtered)
    } else {
      setFilteredProfiles(profiles)
    }
  }, [searchTerm, profiles])

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Skill Swap
              </h1>
              <div className="hidden md:block text-sm text-gray-600">Welcome back, {user?.name}!</div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" className="hover:bg-blue-50 bg-transparent">
                  Dashboard
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="hover:bg-purple-50 bg-transparent">
                  My Profile
                </Button>
              </Link>
              <Button variant="outline" onClick={handleSignOut} className="hover:bg-red-50 bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Discover Amazing Skills</h2>
            <p className="text-gray-600 text-lg">Find the perfect skill swap partner in our community</p>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by skills, name, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-full bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">{profiles.length}</div>
              <div className="text-blue-100">Active Members</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">
                {profiles.reduce((acc, p) => acc + p.skills_offered.length, 0)}
              </div>
              <div className="text-purple-100">Skills Available</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">
                {(profiles.reduce((acc, p) => acc + p.rating, 0) / profiles.length).toFixed(1)}
              </div>
              <div className="text-green-100">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <Card
              key={profile.id}
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
                    <AvatarImage src={profile.profile_photo || `/placeholder.svg?height=64&width=64`} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-semibold">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-900">{profile.name}</CardTitle>
                    {profile.location && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {profile.location}
                      </div>
                    )}
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1 font-medium">
                        {profile.rating.toFixed(1)} ({profile.rating_count} reviews)
                      </span>
                    </div>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {profile.experience_level}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.bio && <p className="text-sm text-gray-600 line-clamp-2">{profile.bio}</p>}

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Skills Offered
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {profile.skills_offered.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-green-50 text-green-700 border-green-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {profile.skills_offered.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{profile.skills_offered.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Skills Wanted
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {profile.skills_wanted.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {profile.skills_wanted.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{profile.skills_wanted.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {profile.availability && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {profile.availability.slice(0, 30)}...
                    </div>
                  )}

                  <div className="pt-2">
                    <Link href={`/profile/${profile.id}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                        Request Swap
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto shadow-lg">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No profiles found</h3>
              <p className="text-gray-500">Try adjusting your search terms or browse all available skills.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
