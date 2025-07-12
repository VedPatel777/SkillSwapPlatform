-- Insert sample users (Note: In production, these would be created through auth.users)
-- This is just for demonstration - you'll need to create actual users through Supabase Auth

-- Sample profiles data
INSERT INTO profiles (id, name, location, skills_offered, skills_wanted, availability, is_public, rating, rating_count) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'Alice Johnson',
  'San Francisco, CA',
  ARRAY['JavaScript', 'React', 'Node.js', 'Python'],
  ARRAY['UI/UX Design', 'Photoshop', 'Figma'],
  'Weekends and evenings after 6 PM',
  true,
  4.8,
  12
),
(
  '22222222-2222-2222-2222-222222222222',
  'Bob Smith',
  'New York, NY',
  ARRAY['Photoshop', 'Illustrator', 'UI/UX Design', 'Figma'],
  ARRAY['React', 'JavaScript', 'Web Development'],
  'Weekdays 9 AM - 5 PM',
  true,
  4.6,
  8
),
(
  '33333333-3333-3333-3333-333333333333',
  'Carol Davis',
  'Austin, TX',
  ARRAY['Excel', 'Data Analysis', 'SQL', 'Tableau'],
  ARRAY['Python', 'Machine Learning', 'Statistics'],
  'Flexible schedule, prefer mornings',
  true,
  4.9,
  15
);

-- Sample swap requests
INSERT INTO swap_requests (requester_id, requested_id, offered_skill, wanted_skill, message, status) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  'JavaScript',
  'UI/UX Design',
  'Hi Bob! I would love to learn UI/UX design from you. I can teach you JavaScript and React in return.',
  'accepted'
),
(
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'Data Analysis',
  'Python',
  'Hello Alice! I am interested in learning Python programming. I can help you with data analysis and Excel.',
  'pending'
);

-- Sample feedback
INSERT INTO feedback (swap_request_id, from_user_id, to_user_id, rating, comment) VALUES
(
  (SELECT id FROM swap_requests WHERE requester_id = '11111111-1111-1111-1111-111111111111' AND requested_id = '22222222-2222-2222-2222-222222222222'),
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  5,
  'Bob was an excellent teacher! Very patient and knowledgeable about UI/UX principles.'
);
