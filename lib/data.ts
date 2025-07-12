import { storage, STORAGE_KEYS } from "./storage"

export type User = {
  id: string
  email: string
  name: string
  created_at: string
}

export type Profile = {
  id: string
  name: string
  location?: string
  profile_photo?: string
  skills_offered: string[]
  skills_wanted: string[]
  availability: string
  is_public: boolean
  rating: number
  rating_count: number
  bio?: string
  experience_level: "beginner" | "intermediate" | "advanced" | "expert"
  created_at: string
  updated_at: string
}

export type SwapRequest = {
  id: string
  requester_id: string
  requested_id: string
  offered_skill: string
  wanted_skill: string
  message: string
  status: "pending" | "accepted" | "rejected" | "completed"
  created_at: string
  updated_at: string
  requester?: Profile
  requested?: Profile
}

export type Feedback = {
  id: string
  swap_request_id: string
  from_user_id: string
  to_user_id: string
  rating: number
  comment: string
  created_at: string
}

// Enhanced mock data with more variety
const initialProfiles: Profile[] = [
  {
    id: "1",
    name: "Sarah Chen",
    location: "San Francisco, CA",
    skills_offered: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    skills_wanted: ["Machine Learning", "Python", "Data Science", "AI"],
    availability: "Weekends and evenings after 7 PM",
    is_public: true,
    rating: 4.9,
    rating_count: 23,
    bio: "Senior Frontend Developer with 6+ years experience. Love teaching React and learning new technologies!",
    experience_level: "expert",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    location: "Austin, TX",
    skills_offered: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    skills_wanted: ["Frontend Development", "React", "CSS Animations", "Three.js"],
    availability: "Flexible schedule, prefer mornings",
    is_public: true,
    rating: 4.8,
    rating_count: 18,
    bio: "Product Designer passionate about creating beautiful, user-centered experiences. Always eager to learn coding!",
    experience_level: "advanced",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Dr. Emily Watson",
    location: "Boston, MA",
    skills_offered: ["Data Science", "Python", "Machine Learning", "Statistics", "R"],
    skills_wanted: ["Web Development", "JavaScript", "Database Design", "Cloud Computing"],
    availability: "Weekdays 6-9 PM, Weekends",
    is_public: true,
    rating: 4.95,
    rating_count: 31,
    bio: "Data Scientist with PhD in Statistics. Love making complex data insights accessible to everyone.",
    experience_level: "expert",
    created_at: "2024-01-03T00:00:00Z",
    updated_at: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    name: "Alex Kim",
    location: "Seattle, WA",
    skills_offered: ["Mobile Development", "Flutter", "React Native", "iOS", "Android"],
    skills_wanted: ["Backend Development", "DevOps", "Docker", "Kubernetes"],
    availability: "Evenings and weekends",
    is_public: true,
    rating: 4.7,
    rating_count: 15,
    bio: "Mobile app developer who's built 20+ apps. Looking to expand into backend and infrastructure.",
    experience_level: "advanced",
    created_at: "2024-01-04T00:00:00Z",
    updated_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "5",
    name: "Maya Patel",
    location: "New York, NY",
    skills_offered: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"],
    skills_wanted: ["Web Design", "Photoshop", "Video Editing", "Branding"],
    availability: "Weekends and lunch breaks",
    is_public: true,
    rating: 4.6,
    rating_count: 12,
    bio: "Marketing strategist helping startups grow. Want to learn design to create better campaigns.",
    experience_level: "intermediate",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-05T00:00:00Z",
  },
  {
    id: "6",
    name: "James Thompson",
    location: "Denver, CO",
    skills_offered: ["Photography", "Video Production", "Adobe Premiere", "Lightroom", "Drone Piloting"],
    skills_wanted: ["Web Development", "E-commerce", "WordPress", "Online Marketing"],
    availability: "Flexible, work from home",
    is_public: true,
    rating: 4.8,
    rating_count: 22,
    bio: "Professional photographer transitioning to digital business. Need web skills to showcase my work online.",
    experience_level: "intermediate",
    created_at: "2024-01-06T00:00:00Z",
    updated_at: "2024-01-06T00:00:00Z",
  },
  {
    id: "7",
    name: "Lisa Zhang",
    location: "Los Angeles, CA",
    skills_offered: ["Project Management", "Agile", "Scrum", "Leadership", "Business Analysis"],
    skills_wanted: ["Data Analysis", "Excel Advanced", "Power BI", "SQL"],
    availability: "Evenings after 6 PM",
    is_public: true,
    rating: 4.9,
    rating_count: 28,
    bio: "Senior Project Manager with 10+ years experience. Want to add data skills to better support my teams.",
    experience_level: "expert",
    created_at: "2024-01-07T00:00:00Z",
    updated_at: "2024-01-07T00:00:00Z",
  },
  {
    id: "8",
    name: "Carlos Mendoza",
    location: "Miami, FL",
    skills_offered: ["Spanish Language", "Translation", "Cultural Consulting", "Public Speaking"],
    skills_wanted: ["Graphic Design", "Illustrator", "Logo Design", "Brand Identity"],
    availability: "Weekends and evenings",
    is_public: true,
    rating: 4.7,
    rating_count: 19,
    bio: "Bilingual consultant helping businesses expand to Latin America. Need design skills for better presentations.",
    experience_level: "advanced",
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-08T00:00:00Z",
  },
]

const initialUsers: User[] = [
  { id: "1", email: "sarah@example.com", name: "Sarah Chen", created_at: "2024-01-01T00:00:00Z" },
  { id: "2", email: "marcus@example.com", name: "Marcus Rodriguez", created_at: "2024-01-02T00:00:00Z" },
  { id: "3", email: "emily@example.com", name: "Dr. Emily Watson", created_at: "2024-01-03T00:00:00Z" },
  { id: "4", email: "alex@example.com", name: "Alex Kim", created_at: "2024-01-04T00:00:00Z" },
  { id: "5", email: "maya@example.com", name: "Maya Patel", created_at: "2024-01-05T00:00:00Z" },
  { id: "6", email: "james@example.com", name: "James Thompson", created_at: "2024-01-06T00:00:00Z" },
  { id: "7", email: "lisa@example.com", name: "Lisa Zhang", created_at: "2024-01-07T00:00:00Z" },
  { id: "8", email: "carlos@example.com", name: "Carlos Mendoza", created_at: "2024-01-08T00:00:00Z" },
]

// Initialize data from storage or use defaults
export const getUsers = (): User[] => {
  const stored = storage.get(STORAGE_KEYS.USER + "s")
  return stored || initialUsers
}

export const getProfiles = (): Profile[] => {
  const stored = storage.get(STORAGE_KEYS.PROFILES)
  return stored || initialProfiles
}

export const getSwapRequests = (): SwapRequest[] => {
  const stored = storage.get(STORAGE_KEYS.REQUESTS)
  return stored || []
}

// User management
export const findUser = (email: string): User | undefined => {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export const createUser = (email: string, name: string): User => {
  const users = getUsers()
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    created_at: new Date().toISOString(),
  }

  const updatedUsers = [...users, newUser]
  storage.set(STORAGE_KEYS.USER + "s", updatedUsers)

  // Create default profile
  const profiles = getProfiles()
  const newProfile: Profile = {
    id: newUser.id,
    name: newUser.name,
    skills_offered: [],
    skills_wanted: [],
    availability: "",
    is_public: true,
    rating: 0,
    rating_count: 0,
    experience_level: "beginner",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const updatedProfiles = [...profiles, newProfile]
  storage.set(STORAGE_KEYS.PROFILES, updatedProfiles)

  return newUser
}

// Profile management
export const getProfile = (id: string): Profile | undefined => {
  return getProfiles().find((p) => p.id === id)
}

export const updateProfile = (id: string, updates: Partial<Profile>) => {
  const profiles = getProfiles()
  const index = profiles.findIndex((p) => p.id === id)

  if (index !== -1) {
    profiles[index] = {
      ...profiles[index],
      ...updates,
      updated_at: new Date().toISOString(),
    }
    storage.set(STORAGE_KEYS.PROFILES, profiles)
  }
}

// Swap request management
export const addSwapRequest = (request: Omit<SwapRequest, "id" | "created_at" | "updated_at">): SwapRequest => {
  const requests = getSwapRequests()
  const newRequest: SwapRequest = {
    ...request,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const updatedRequests = [...requests, newRequest]
  storage.set(STORAGE_KEYS.REQUESTS, updatedRequests)

  return newRequest
}

export const updateSwapRequest = (id: string, updates: Partial<SwapRequest>) => {
  const requests = getSwapRequests()
  const index = requests.findIndex((r) => r.id === id)

  if (index !== -1) {
    requests[index] = {
      ...requests[index],
      ...updates,
      updated_at: new Date().toISOString(),
    }
    storage.set(STORAGE_KEYS.REQUESTS, requests)
  }
}

export const deleteSwapRequest = (id: string) => {
  const requests = getSwapRequests()
  const filtered = requests.filter((r) => r.id !== id)
  storage.set(STORAGE_KEYS.REQUESTS, filtered)
}
