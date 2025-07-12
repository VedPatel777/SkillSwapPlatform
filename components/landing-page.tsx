"use client"

import { HeroSection } from "./hero-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ArrowRight, Users, Zap, Shield, Heart } from "lucide-react"
import Link from "next/link"

const featuredSkills = [
  "Web Development",
  "UI/UX Design",
  "Data Science",
  "Mobile Development",
  "Digital Marketing",
  "Photography",
  "Project Management",
  "Language Learning",
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    content: "I learned Python data analysis in exchange for teaching React. Amazing experience!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Designer",
    content: "The community here is incredible. I've made lasting professional connections.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Dr. Emily Watson",
    role: "Data Scientist",
    content: "Perfect platform for knowledge exchange. Highly recommend to everyone!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const features = [
  {
    icon: Users,
    title: "Smart Matching",
    description:
      "Our algorithm connects you with the perfect skill swap partners based on your interests and availability.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "All members are verified with ratings and reviews to ensure quality exchanges.",
  },
  {
    icon: Zap,
    title: "Instant Connect",
    description: "Send swap requests instantly and start learning new skills within days.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "Join a supportive community of learners and teachers helping each other grow.",
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Skill Swap?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make skill exchange simple, safe, and rewarding for everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
              >
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Skills to Swap</h2>
            <p className="text-xl text-gray-600">Discover the most in-demand skills in our community</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {featuredSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-6 py-3 text-lg font-medium bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-colors duration-200 cursor-pointer"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Start swapping skills in just a few simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Create Your Profile</h3>
              <p className="text-gray-600 text-lg">
                List the skills you can teach and what you want to learn. Add your availability and preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Find Your Match</h3>
              <p className="text-gray-600 text-lg">
                Browse profiles and find people who have skills you want and need skills you offer.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Start Learning</h3>
              <p className="text-gray-600 text-lg">
                Send swap requests, connect with your matches, and begin your skill exchange journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Members Say</h2>
            <p className="text-xl text-gray-600">Real stories from our skill-swapping community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Skill Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers who are already growing their skills together.
          </p>
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
