# SkillSwapPlatform
Git Repo for Odoo Hackathon 2025 for Skill Swap Platform

Problem Statement : Skill Swap Platform

@Team Leader :
Name : Ved Patel
Email : patelved3479@gmail.com

@Member 2 :
Name : Ayush Patel
Email : ayushpatel.ict22@adaniuni.ac.in

@Member 3 :
Name : Parthiv Patel
Email : parthivpatel.ict22@adaniuni.ac.in


=======
# 🔄 SkillSwap Platform

A modern skill exchange platform built with Next.js, TypeScript, and Tailwind CSS. Connect with others to exchange skills and knowledge in a seamless, user-friendly interface.

![SkillSwap Platform](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality
- **User Profiles**: Comprehensive profile management with skills, location, and availability
- **Skill Discovery**: Browse and search users by specific skills
- **Swap Requests**: Send, receive, accept, and reject skill exchange requests
- **Dashboard**: Personal overview with statistics and activity tracking
- **Privacy Controls**: Public/private profile settings

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Interactive Components**: Built with shadcn/ui for consistency
- **Real-time Feedback**: Toast notifications for user actions
- **Mobile Responsive**: Optimized for all device sizes
- **Intuitive Navigation**: Clear visual hierarchy and user flow

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **RESTful API**: Complete CRUD operations for users and swaps
- **Form Validation**: Client-side validation with error handling
- **Mock Data**: Realistic sample data for demonstration
- **Modern Architecture**: Next.js 15 with App Router

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VedPatel777/SkillSwapPlatform.git
   cd SkillSwapPlatform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Screenshots

### Homepage - Browse Skills
- Clean interface for discovering users and their skills
- Search functionality by skill name
- User cards with ratings and skill badges

### Dashboard
- Personal statistics and activity overview
- Quick actions for common tasks
- Recent swap request activity

### Profile Management
- Edit personal information and skills
- Dynamic skill addition/removal
- Privacy settings control

### Swap Management
- Tabbed interface for different request types
- Accept/reject incoming requests
- Track swap status and history

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Emoji-based (no external dependencies)
- **State Management**: React hooks
- **API**: Next.js API routes


## 🔗 API Endpoints

### Users
- `GET /api/users` - Get all public users (with optional skill search)
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get specific user
- `PUT /api/users/[id]` - Update user profile

### Swaps
- `GET /api/swaps` - Get user's swap requests
- `POST /api/swaps` - Create new swap request
- `GET /api/swaps/[id]` - Get specific swap request
- `PUT /api/swaps/[id]` - Update swap request (accept/reject)
- `DELETE /api/swaps/[id]` - Delete pending swap request

## 🎯 Usage Examples

### Creating a Profile
1. Navigate to "My Profile" in the navigation
2. Fill in your basic information
3. Add skills you can offer and want to learn
4. Set your availability and privacy preferences
5. Save your profile

### Finding Skills
1. Use the search bar on the homepage
2. Enter a skill name (e.g., "JavaScript", "Design")
3. Browse the filtered results
4. Click "View Profile" for detailed information

### Requesting a Swap
1. Find a user with skills you want to learn
2. Click "Request Swap"
3. Select skills you can offer
4. Choose skills you want to learn
5. Add a personal message
6. Send the request

### Managing Swaps
1. Go to "My Swaps" in the navigation
2. View different tabs: Received, Sent, Active, Completed
3. Accept or reject incoming requests
4. Track the status of your exchanges

## 🔮 Future Enhancements

- **Real Database**: Replace mock data with PostgreSQL/MongoDB
- **Authentication**: Add user login/signup with NextAuth.js
- **Real-time Chat**: Integrate messaging between users
- **Video Calls**: Add video conferencing for skill sessions
- **Rating System**: Implement post-swap rating and reviews
- **Notifications**: Email/push notifications for requests
- **Advanced Search**: Filter by location, availability, rating
- **Skill Categories**: Organize skills into categories
- **Calendar Integration**: Schedule skill exchange sessions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons and emojis for visual elements

## 📞 Contact

Ved Patel - [@VedPatel777] - patelved3479@gmail.com

Project Link: [https://github.com/VedPatel777/SkillSwapPlatform](https://github.com/VedPatel777/SkillSwapPlatform)

---

⭐ **Star this repository if you found it helpful!**
