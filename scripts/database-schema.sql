-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  profile_photo TEXT,
  skills_offered TEXT[] DEFAULT '{}',
  skills_wanted TEXT[] DEFAULT '{}',
  availability TEXT DEFAULT '',
  is_public BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create swap_requests table
CREATE TABLE IF NOT EXISTS swap_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  requested_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  offered_skill TEXT NOT NULL,
  wanted_skill TEXT NOT NULL,
  message TEXT DEFAULT '',
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  swap_request_id UUID REFERENCES swap_requests(id) ON DELETE CASCADE NOT NULL,
  from_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE swap_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for swap_requests
CREATE POLICY "Users can view their own requests" ON swap_requests
  FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = requested_id);

CREATE POLICY "Users can insert swap requests" ON swap_requests
  FOR INSERT WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update requests they received" ON swap_requests
  FOR UPDATE USING (auth.uid() = requested_id);

CREATE POLICY "Users can delete their own pending requests" ON swap_requests
  FOR DELETE USING (auth.uid() = requester_id AND status = 'pending');

-- Create policies for feedback
CREATE POLICY "Users can view feedback about them" ON feedback
  FOR SELECT USING (auth.uid() = to_user_id OR auth.uid() = from_user_id);

CREATE POLICY "Users can insert feedback" ON feedback
  FOR INSERT WITH CHECK (auth.uid() = from_user_id);

-- Create indexes for better performance
CREATE INDEX idx_profiles_public ON profiles(is_public);
CREATE INDEX idx_profiles_skills_offered ON profiles USING GIN(skills_offered);
CREATE INDEX idx_profiles_skills_wanted ON profiles USING GIN(skills_wanted);
CREATE INDEX idx_swap_requests_requester ON swap_requests(requester_id);
CREATE INDEX idx_swap_requests_requested ON swap_requests(requested_id);
CREATE INDEX idx_swap_requests_status ON swap_requests(status);
CREATE INDEX idx_feedback_to_user ON feedback(to_user_id);
