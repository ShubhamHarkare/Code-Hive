# Code-Hive 🐝

[![GitHub Repo stars](https://img.shields.io/github/stars/ShubhamHarkare/Code-Hive?style=social)](https://github.com/ShubhamHarkare/Code-Hive/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ShubhamHarkare/Code-Hive?style=social)](https://github.com/ShubhamHarkare/Code-Hive/forks)
[![License](https://img.shields.io/github/license/ShubhamHarkare/Code-Hive)](https://github.com/ShubhamHarkare/Code-Hive/blob/main/LICENSE)
[![Deploy Status](https://img.shields.io/badge/deployment-active-brightgreen)](https://code-hive-qngf6dv0z-shubhamharkares-projects.vercel.app)

> **Real-time collaborative code editor** built with React, CodeMirror, and Socket.IO. Code with your team in real time, share rooms, and collaborate seamlessly—no setup required!

**🚀 [Live Demo](https://code-hive-qngf6dv0z-shubhamharkares-projects.vercel.app)** | **📖 [Documentation](#installation)** | **🐛 [Report Bug](https://github.com/ShubhamHarkare/Code-Hive/issues)**

---

## ✨ Features

- ⚡ **Real-time Collaboration** - See code changes instantly across all connected users
- 🏠 **Room-Based Workspaces** - Create unique rooms and invite team members
- 🎨 **Syntax Highlighting** - Python syntax highlighting powered by CodeMirror
- 👥 **Live Presence** - See who's currently in your room
- 📋 **Easy Sharing** - One-click room ID copying for quick invites
- 🎯 **Clean UI** - Minimalist, distraction-free interface
- 🔄 **Auto-sync** - Changes sync automatically via WebSockets
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **CodeMirror** - Code editor component
- **React Router** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **Deployed on:** Vercel

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - WebSocket server
- **Deployed on:** Render

### Languages
- JavaScript (ES6+)

---

## 🚀 Live Deployment

The application is live and accessible at:

**Frontend:** [https://code-hive.vercel.app](https://code-hive.vercel.app)

**Backend API:** Hosted on Render (WebSocket server)

### CI/CD Pipeline
- Automated deployments via GitHub Actions
- Frontend deploys to Vercel on push to `main` or `feature_001` branches
- Backend deploys to Render via deploy hooks
- Zero-downtime deployments

---

## 📸 Screenshots

![Code-Hive Home](screenshots/collaboration.png)
*Real-time collaborative coding interface*

![Room Creation](screenshots/room_creation.gif)
*Easy room creation and joining*

> **Note:** Add your actual screenshots to the `screenshots/` folder

---

## 🏃‍♂️ Quick Start

### Try it Live
Simply visit [https://code-hive.vercel.app](https://code-hive.vercel.app) and start coding!

1. Enter your username
2. Create a new room or join an existing one
3. Share the room ID with your team
4. Start coding together in real-time!

---

## 💻 Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ShubhamHarkare/Code-Hive.git
cd Code-Hive
```

2. **Install Server Dependencies**
```bash
cd server
npm install
```

3. **Install Client Dependencies**
```bash
cd ../client
npm install
```

4. **Configure Environment Variables**

Create `.env` file in the `server` directory:
```env
PORT=5000
```

Create `.env` file in the `client` directory:
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

5. **Start the Backend Server**
```bash
cd server
npm start
```

Server will run on `http://localhost:5000`

6. **Start the Frontend (in a new terminal)**
```bash
cd client
npm start
```

Client will run on `http://localhost:3000`

---

## 📁 Project Structure
```
Code-Hive/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── server.js          # Express + Socket.IO server
│   └── package.json
├── .github/
│   └── workflows/         # CI/CD pipelines
├── screenshots/           # App screenshots
└── README.md
```

---

## 🔧 Available Scripts

### Client
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Server
```bash
npm start          # Start the server
npm run dev        # Start with nodemon (auto-reload)
```

---

## 🌐 Deployment

### Deploy Your Own Instance

#### Frontend (Vercel)
1. Fork this repository
2. Sign up on [Vercel](https://vercel.com)
3. Import your forked repository
4. Set `Root Directory` to `client`
5. Add environment variable: `REACT_APP_BACKEND_URL`
6. Deploy!

#### Backend (Render)
1. Sign up on [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set `Root Directory` to `server`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Deploy!

#### GitHub Actions (Automated)
The repository includes GitHub Actions workflows for automated deployment:
- `.github/workflows/deploy-fullstack.yml` - Deploys both frontend and backend
- Triggers on push to `main` or `feature_001` branches

**Required GitHub Secrets:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `RENDER_DEPLOY_HOOK`

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
```bash
   git checkout -b feature/AmazingFeature
```
3. **Commit your changes**
```bash
   git commit -m 'Add some AmazingFeature'
```
4. **Push to the branch**
```bash
   git push origin feature/AmazingFeature
```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test your changes locally before submitting
- Update documentation if needed

---

## 🐛 Known Issues & Future Enhancements

### Known Issues
- None at the moment! 🎉

### Planned Features
- [ ] Multiple language support (JavaScript, Java, C++, etc.)
- [ ] Code execution environment
- [ ] Chat functionality
- [ ] File upload/download
- [ ] Code version history
- [ ] User authentication
- [ ] Private rooms with passwords
- [ ] Code templates
- [ ] Dark mode toggle

**Want to work on any of these?** Check out our [contribution guidelines](#contributing)!

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Shubham Harkare**

- GitHub: [@ShubhamHarkare](https://github.com/ShubhamHarkare)
- Project Link: [https://github.com/ShubhamHarkare/Code-Hive](https://github.com/ShubhamHarkare/Code-Hive)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Socket.IO](https://socket.io/) - Real-time communication
- [CodeMirror](https://codemirror.net/) - Code editor
- [Vercel](https://vercel.com/) - Frontend hosting
- [Render](https://render.com/) - Backend hosting

---

## 📊 Project Stats

![GitHub last commit](https://img.shields.io/github/last-commit/ShubhamHarkare/Code-Hive)
![GitHub issues](https://img.shields.io/github/issues/ShubhamHarkare/Code-Hive)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ShubhamHarkare/Code-Hive)

---

## ⭐ Show Your Support

If you find this project useful, please consider giving it a star! It helps others discover the project and motivates continued development.

[![GitHub stars](https://img.shields.io/github/stars/ShubhamHarkare/Code-Hive?style=social)](https://github.com/ShubhamHarkare/Code-Hive/stargazers)

---

<div align="center">
  <strong>Built with ❤️ by Shubham Harkare</strong>
  <br>
  <sub>Happy Coding! 🐝</sub>
</div>