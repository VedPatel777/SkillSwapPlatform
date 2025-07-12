"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { getSwapRequests, getProfile, updateSwapRequest, deleteSwapRequest, type SwapRequest } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Star, User, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [incomingRequests, setIncomingRequests] = useState<SwapRequest[]>([])
  const [outgoingRequests, setOutgoingRequests] = useState<SwapRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<SwapRequest | null>(null)
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState("")
  const [submittingFeedback, setSubmittingFeedback] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    fetchRequests()
  }, [user, router])

  const fetchRequests = () => {
    if (!user) return

    const allRequests = getSwapRequests()

    // Get incoming requests with requester profile
    const incoming = allRequests
      .filter((r) => r.requested_id === user.id)
      .map((r) => ({
        ...r,
        requester: getProfile(r.requester_id),
      }))

    // Get outgoing requests with requested profile
    const outgoing = allRequests
      .filter((r) => r.requester_id === user.id)
      .map((r) => ({
        ...r,
        requested: getProfile(r.requested_id),
      }))

    setIncomingRequests(incoming)
    setOutgoingRequests(outgoing)
  }

  const handleRequestAction = (requestId: string, action: "accepted" | "rejected") => {
    updateSwapRequest(requestId, { status: action })

    toast({
      title: "Success",
      description: `Request ${action} successfully`,
    })

    fetchRequests()
  }

  const handleDeleteRequest = (requestId: string) => {
    deleteSwapRequest(requestId)

    toast({
      title: "Success",
      description: "Request deleted successfully",
    })

    fetchRequests()
  }

  const handleSubmitFeedback = async () => {
    if (!selectedRequest || !user) return

    setSubmittingFeedback(true)

    try {
      // In a real app, this would save to feedback table and update user rating
      toast({
        title: "Success",
        description: "Feedback submitted successfully",
      })

      setSelectedRequest(null)
      setRating(5)
      setFeedback("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      })
    } finally {
      setSubmittingFeedback(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push("/")}>
                Home
              </Button>
              <Button variant="outline" onClick={() => router.push("/profile")}>
                My Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="incoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incoming">Incoming Requests ({incomingRequests.length})</TabsTrigger>
            <TabsTrigger value="outgoing">Outgoing Requests ({outgoingRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="incoming" className="space-y-4">
            {incomingRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No incoming requests</p>
                </CardContent>
              </Card>
            ) : (
              incomingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={request.requester?.profile_photo || "/placeholder.svg?height=48&width=48"}
                          />
                          <AvatarFallback>
                            <User className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{request.requester?.name}</h3>
                          <div className="flex items-center gap-4 mt-2">
                            <div>
                              <span className="text-sm text-gray-500">Offers:</span>
                              <Badge variant="secondary" className="ml-1">
                                {request.offered_skill}
                              </Badge>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Wants:</span>
                              <Badge variant="outline" className="ml-1">
                                {request.wanted_skill}
                              </Badge>
                            </div>
                          </div>
                          {request.message && <p className="text-gray-600 mt-2">{request.message}</p>}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant={
                                request.status === "pending"
                                  ? "default"
                                  : request.status === "accepted"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {request.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(request.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {request.status === "pending" && (
                          <>
                            <Button size="sm" onClick={() => handleRequestAction(request.id, "accepted")}>
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRequestAction(request.id, "rejected")}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {request.status === "accepted" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedRequest(request)}>
                                Leave Feedback
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Leave Feedback for {request.requester?.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Rating</Label>
                                  <div className="flex gap-1 mt-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-6 w-6 cursor-pointer ${
                                          star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                        }`}
                                        onClick={() => setRating(star)}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="feedback">Comment</Label>
                                  <Textarea
                                    id="feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Share your experience..."
                                    rows={3}
                                  />
                                </div>
                                <Button onClick={handleSubmitFeedback} disabled={submittingFeedback} className="w-full">
                                  {submittingFeedback ? "Submitting..." : "Submit Feedback"}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="outgoing" className="space-y-4">
            {outgoingRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No outgoing requests</p>
                </CardContent>
              </Card>
            ) : (
              outgoingRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={request.requested?.profile_photo || "/placeholder.svg?height=48&width=48"}
                          />
                          <AvatarFallback>
                            <User className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{request.requested?.name}</h3>
                          <div className="flex items-center gap-4 mt-2">
                            <div>
                              <span className="text-sm text-gray-500">You offer:</span>
                              <Badge variant="secondary" className="ml-1">
                                {request.offered_skill}
                              </Badge>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">You want:</span>
                              <Badge variant="outline" className="ml-1">
                                {request.wanted_skill}
                              </Badge>
                            </div>
                          </div>
                          {request.message && <p className="text-gray-600 mt-2">{request.message}</p>}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant={
                                request.status === "pending"
                                  ? "default"
                                  : request.status === "accepted"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {request.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(request.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {request.status === "pending" && (
                          <Button size="sm" variant="outline" onClick={() => handleDeleteRequest(request.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        {request.status === "accepted" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedRequest(request)}>
                                Leave Feedback
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Leave Feedback for {request.requested?.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Rating</Label>
                                  <div className="flex gap-1 mt-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-6 w-6 cursor-pointer ${
                                          star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                        }`}
                                        onClick={() => setRating(star)}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="feedback">Comment</Label>
                                  <Textarea
                                    id="feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Share your experience..."
                                    rows={3}
                                  />
                                </div>
                                <Button onClick={handleSubmitFeedback} disabled={submittingFeedback} className="w-full">
                                  {submittingFeedback ? "Submitting..." : "Submit Feedback"}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
