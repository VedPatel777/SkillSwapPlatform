import { UserProfile, SwapRequest } from '@/types/models';

// Mock data store - in production, this would be a database
export const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    location: 'New York, NY',
    photoUrl: undefined,
    skillsOffered: ['JavaScript', 'React', 'Node.js'],
    skillsWanted: ['Python', 'Machine Learning', 'Data Science'],
    availability: 'Weekends, Evenings',
    isPublic: true,
    rating: 4.8,
    totalSwaps: 12,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    location: 'San Francisco, CA',
    photoUrl: undefined,
    skillsOffered: ['Python', 'Django', 'PostgreSQL'],
    skillsWanted: ['React', 'TypeScript', 'AWS'],
    availability: 'Weekdays after 6 PM',
    isPublic: true,
    rating: 4.6,
    totalSwaps: 8,
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    location: 'Austin, TX',
    photoUrl: undefined,
    skillsOffered: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
    skillsWanted: ['Frontend Development', 'CSS', 'JavaScript'],
    availability: 'Flexible schedule',
    isPublic: true,
    rating: 4.9,
    totalSwaps: 15,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    location: 'Seattle, WA',
    photoUrl: undefined,
    skillsOffered: ['Data Science', 'Machine Learning', 'R'],
    skillsWanted: ['Cloud Computing', 'Docker', 'Kubernetes'],
    availability: 'Weekends only',
    isPublic: false,
    rating: 4.7,
    totalSwaps: 6,
    createdAt: new Date('2024-02-10'),
  },
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    requesterId: '1',
    receiverId: '2',
    requesterName: 'Alice Johnson',
    receiverName: 'Bob Smith',
    offeredSkills: ['JavaScript', 'React'],
    requestedSkills: ['Python', 'Django'],
    message: 'Hi Bob! I\'d love to learn Python and Django. I can teach you React in return.',
    status: 'pending',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: '2',
    requesterId: '3',
    receiverId: '1',
    requesterName: 'Carol Davis',
    receiverName: 'Alice Johnson',
    offeredSkills: ['UI/UX Design', 'Figma'],
    requestedSkills: ['JavaScript', 'React'],
    message: 'Hello Alice! I can help you with design skills if you can teach me React.',
    status: 'accepted',
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-03-02'),
  },
];

// Current user simulation - in production, this would come from authentication
export const currentUserId = '1';

// Helper functions
export const getCurrentUser = (): UserProfile | undefined => {
  return mockUsers.find(user => user.id === currentUserId);
};

export const getUserById = (id: string): UserProfile | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getPublicUsers = (): UserProfile[] => {
  return mockUsers.filter(user => user.isPublic);
};

export const getSwapRequestsForUser = (userId: string): SwapRequest[] => {
  return mockSwapRequests.filter(
    swap => swap.requesterId === userId || swap.receiverId === userId
  );
};

export const searchUsersBySkill = (skill: string): UserProfile[] => {
  const searchTerm = skill.toLowerCase();
  return mockUsers.filter(user => 
    user.isPublic && (
      user.skillsOffered.some(s => s.toLowerCase().includes(searchTerm)) ||
      user.skillsWanted.some(s => s.toLowerCase().includes(searchTerm))
    )
  );
};
