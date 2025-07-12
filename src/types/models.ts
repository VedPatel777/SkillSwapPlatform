export interface UserProfile {
  id: string;
  name: string;
  email: string;
  location?: string;
  photoUrl?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string;
  isPublic: boolean;
  rating: number;
  totalSwaps: number;
  createdAt: Date;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  receiverId: string;
  requesterName: string;
  receiverName: string;
  offeredSkills: string[];
  requestedSkills: string[];
  message?: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  createdAt: Date;
  updatedAt: Date;
  feedback?: {
    rating: number;
    comment: string;
    fromUserId: string;
  };
}

export interface SearchFilters {
  skill?: string;
  location?: string;
  availability?: string;
}

export type SwapStatus = "pending" | "accepted" | "rejected" | "completed";
