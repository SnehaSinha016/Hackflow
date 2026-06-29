# HackFlow - AI Powered Hackathon Project Management Platform

<p align="center">
  <img src="./Client/public/favicon.svg" width="120" alt="HackFlow Logo">
</p>

<p align="center">
  <h3 align="center">Plan • Collaborate • Build • Win</h3>
  <p align="center">
    An AI-powered project management platform built specifically for hackathons.
  </p>
</p>

---

## Overview

HackFlow is a full-stack MERN application designed to simplify hackathon collaboration. It provides an all-in-one workspace where teams can create projects, collaborate in real time, chat, manage tasks, and leverage AI assistance to build faster.

Whether you're participating in a 24-hour hackathon or managing a long-term project, HackFlow helps keep everything organized in one place.

---

## Features

### Authentication
- Secure User Registration & Login
- JWT Authentication
- Password Encryption using bcrypt
- Firebase Authentication

### Project Management
- Create and manage multiple projects
- Invite teammates
- Assign project roles
- Track project progress
- Project workspace

### Team Collaboration
- Shared project dashboard
- Team member management
- Activity tracking
- Collaboration tools

### Real-Time Chat
- Socket.IO based messaging
- Instant communication
- Live updates

### AI Assistant
- Powered by Groq AI
- Brainstorm project ideas
- Generate documentation
- Coding assistance
- Productivity enhancement

### Notifications
- Real-time notifications
- Project activity updates
- Team alerts

### Dashboard
- Project statistics
- Team overview
- Recent activities
- Task summaries

### Responsive Design
- Mobile-friendly interface
- Modern React UI
- Clean and intuitive user experience

---

## Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Tailwind CSS
- Axios
- Firebase
- Socket.IO Client
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Firebase Admin SDK
- Socket.IO
- Groq API

### Database
- MongoDB

---

## Project Structure

```text
HackFlow
│
├── Client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── hooks
│   │   └── assets
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── socket
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/HackFlow.git

cd HackFlow
```

---

### Install Frontend Dependencies

```bash
cd Client

npm install
```

---

### Install Backend Dependencies

```bash
cd ../server

npm install
```

---

## Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GROQ_API_KEY=your_groq_api_key

FIREBASE_PROJECT_ID=

FIREBASE_PRIVATE_KEY=

FIREBASE_CLIENT_EMAIL=
```

---

## Running the Project

### Start Backend

```bash
cd server

npm run dev
```

---

### Start Frontend

```bash
cd Client

npm run dev
```

---

## Local URLs

| Service | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |

---

## Screenshots

Add screenshots of your application here.

| Landing Page | Dashboard |
|--------------|-----------|
| Screenshot | Screenshot |

| Project Workspace | AI Assistant |
|-------------------|--------------|
| Screenshot | Screenshot |

| Chat | Notifications |
|------|---------------|
| Screenshot | Screenshot |

---

## Future Enhancements

- ✅ AI Task Prioritization
- ✅ Kanban Board
- ✅ Calendar Integration
- ✅ GitHub Integration
- ✅ File Sharing
- ✅ Video Conferencing
- ✅ Analytics Dashboard
- ✅ Dark Mode
- ✅ Team Performance Insights
- ✅ Deployment Support

---

## Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit your changes

```bash
git commit -m "Added New Feature"
```

4. Push the branch

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.

---

## Author

**Sneha Sinha**

- B.Tech, Chemical Engineering
- IIT Patna
- Full Stack MERN Developer
- AI Enthusiast

---

## Support

If you found this project useful, consider giving it a on GitHub. It motivates future development and helps others discover the project.

---

<p align="center">
Made with ❤️ by Sneha Sinha
</p>
