# Code-Hive 🐝

> **Real-time collaborative code editor** with multi-language support and code execution. Write, share, and run code together in synchronized rooms—no setup required!

[![GitHub Repo stars](https://img.shields.io/github/stars/ShubhamHarkare/Code-Hive?style=social)](https://github.com/ShubhamHarkare/Code-Hive/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ShubhamHarkare/Code-Hive?style=social)](https://github.com/ShubhamHarkare/Code-Hive/forks)
[![License](https://img.shields.io/github/license/ShubhamHarkare/Code-Hive)](https://github.com/ShubhamHarkare/Code-Hive/blob/main/LICENSE)
[![Deploy Status](https://img.shields.io/badge/deployment-active-brightgreen)](https://code-hive.vercel.app)

**🚀 [Try Live Demo](https://code-hive.vercel.app)** | **📖 [Technical Docs](TECHNICAL.md)** | **🐛 [Report Issues](https://github.com/ShubhamHarkare/Code-Hive/issues)**

---

## ✨ Key Features

### 🔄 Real-Time Collaboration
- **Instant synchronization** - See changes as teammates type with <100ms latency
- **Live presence indicators** - Know who's in your coding session
- **Persistent room state** - Code is maintained while users are connected

### 💻 Multi-Language Support
- **Python** - Full syntax highlighting and execution
- **C++** - Modern C++ support with compile-time feedback
- **JavaScript** - ES6+ compatible with instant results
- Powered by [Piston API](https://github.com/engineer-man/piston) for secure code execution

### 🎨 Smart Code Editor
- **CodeMirror 6** integration with intelligent auto-completion
- **Light/Dark themes** - Toggle between GitHub Light and One Dark themes
- **Language-aware syntax highlighting** - Context-sensitive code coloring
- **Responsive design** - Works seamlessly on desktop, tablet, and mobile

### 🏠 Room-Based Architecture
- **Unique room IDs** - Share secure UUIDs to invite collaborators
- **One-click room creation** - Instant setup with no registration
- **Easy room sharing** - Copy room ID with a single click

---

## 🎯 Quick Start

### Try Online (Recommended)
1. Visit **[code-hive.vercel.app](https://code-hive.vercel.app)**
2. Enter your username
3. Click **"Create Room"** or join with an existing Room ID
4. Share the Room ID with your team
5. Start coding together in real-time!

### Run Locally

**Prerequisites:**
- Node.js 18.x or higher
- npm 9.x or higher

**Installation:**

```bash
# Clone the repository
git clone https://github.com/ShubhamHarkare/Code-Hive.git
cd Code-Hive

# Setup backend
cd server
npm install
cp .env.example .env
npm run dev

# Setup frontend (in new terminal)
cd ../client
npm install
cp .env.example .env
npm start
```

The app will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5555

---

## 🏗️ Architecture

[![](https://mermaid.ink/img/pako:eNqFkmFvmzAQhv-KdfuaRjhAYFY1KaW0q7RpURtpUqEfXDg3VglmxlRJk_z3OZhudJo2f7rzvffe45P3UKgSgcGT5s2arC7ymtjTdo_uIqkk1ibLwQXkC9-hzuHByU5nkd0iLwxZNM0DOTv7RC6yxFp-lVorTdJSGqXH8l6TZHeqeEYzvfk2jBgkWJcu-IPjDvULasvhgr9wXGbpttHYtoPWwaSjQcP9qKWXXPW8JN1i0RmparJY3vyHJt0a1DWvLM9b2LvLAtt3UNfZUrbmX54JObcQh-_46EBJ-mK30R5I6upXJ8bD59VqSW7xR4etOZDrd1BmV-GwRCJkVbEPSEUoxLg8bM2VhRAB0nH51yMGgWcdBEzsp5AlMKM7nMAG9YafUtifWnMwa9xgDsyGJdfPOeT10fY0vL5XavPWplX3tAYmeNXarGtKbvBScrvH3xK7EtSJ6moDzKe9BbA9bIHNvWkcBsGM-pFHA0qjCeyAxf70o02jmEazMI79-XECr_1Mbxr63jyK_SCI5zMaetHxJxsF4VQ?type=png)](https://mermaid.live/edit#pako:eNqFkmFvmzAQhv-KdfuaRjhAYFY1KaW0q7RpURtpUqEfXDg3VglmxlRJk_z3OZhudJo2f7rzvffe45P3UKgSgcGT5s2arC7ymtjTdo_uIqkk1ibLwQXkC9-hzuHByU5nkd0iLwxZNM0DOTv7RC6yxFp-lVorTdJSGqXH8l6TZHeqeEYzvfk2jBgkWJcu-IPjDvULasvhgr9wXGbpttHYtoPWwaSjQcP9qKWXXPW8JN1i0RmparJY3vyHJt0a1DWvLM9b2LvLAtt3UNfZUrbmX54JObcQh-_46EBJ-mK30R5I6upXJ8bD59VqSW7xR4etOZDrd1BmV-GwRCJkVbEPSEUoxLg8bM2VhRAB0nH51yMGgWcdBEzsp5AlMKM7nMAG9YafUtifWnMwa9xgDsyGJdfPOeT10fY0vL5XavPWplX3tAYmeNXarGtKbvBScrvH3xK7EtSJ6moDzKe9BbA9bIHNvWkcBsGM-pFHA0qjCeyAxf70o02jmEazMI79-XECr_1Mbxr63jyK_SCI5zMaetHxJxsF4VQ)

### Tech Stack

**Frontend:**
- React 19.2+ with Hooks
- CodeMirror 6 for code editing
- Socket.IO Client for real-time sync
- React Router for navigation
- React Hot Toast for notifications
- Deployed on **Vercel**

**Backend:**
- Node.js 18+ with Express 5
- Socket.IO for WebSocket connections
- CORS for cross-origin support
- Piston API integration for code execution
- Deployed on **Render**

---

## 📁 Project Structure

```
Code-Hive/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── HomePage.jsx      # Landing page with room creation
│   │   │   ├── Editor.jsx        # Main editor interface
│   │   │   ├── Codespace.jsx     # CodeMirror wrapper
│   │   │   ├── Client.jsx        # User avatar component
│   │   │   └── Socket.js         # Socket.IO client setup
│   │   ├── __tests__/     # Jest test files
│   │   └── App.js         # Main app component
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Node.js backend
│   ├── index.js          # Main server file with Socket.IO
│   ├── codeExecution.js  # Piston API integration
│   ├── __tests__/        # Server tests
│   └── package.json
│
├── .github/
│   └── workflows/        # CI/CD pipelines
│       ├── deploy_all.yaml       # Full stack deployment
│       ├── deploy_backend.yaml   # Backend only
│       └── deploy_frontend.yaml  # Frontend only
│
├── TECHNICAL.md          # Detailed technical documentation
└── README.md            # This file
```

---

## 🚀 Deployment

### Automated CI/CD

The project uses GitHub Actions for continuous deployment:

[![](https://mermaid.ink/img/pako:eNpN0E1vgjAYB_Cv0jy7oikiAj0sEQF38LB42GHgoYMqjYWSUpY5wndfBbbZQ9N_f3361kMuCwYELoo2JTocsxqZtk33XKPXri1PaLF4RmFv8kv3gba55rJuh2lZOOIuDTsuCpQoWWtWF6dHjGYMaX79t91ocRqxRsgb0hK9MZUzMXM0cvLAR1PL1MzxyPv0wD8Z2jaN4Dm9X2vmZOIpTH2rb8IsRWcuBHlKksjD-FH2swQ4jgMMlvkOXgDRqmMWVExV9B6hv9dkoEtWsQyIGRZUXTPI6sHUNLR-l7L6LVOyu5RAzlS0JnVNQTWLODUfXf3NqvFZO9nVGojjjnsA6eELyAYvfXe9XtmOh-21bXsW3ID4zjIw0fNtb-X6vrMZLPgeD8VL18Ebz3cc23ftwA1Www_jW4yh?type=png)](https://mermaid.live/edit#pako:eNpN0E1vgjAYB_Cv0jy7oikiAj0sEQF38LB42GHgoYMqjYWSUpY5wndfBbbZQ9N_f3361kMuCwYELoo2JTocsxqZtk33XKPXri1PaLF4RmFv8kv3gba55rJuh2lZOOIuDTsuCpQoWWtWF6dHjGYMaX79t91ocRqxRsgb0hK9MZUzMXM0cvLAR1PL1MzxyPv0wD8Z2jaN4Dm9X2vmZOIpTH2rb8IsRWcuBHlKksjD-FH2swQ4jgMMlvkOXgDRqmMWVExV9B6hv9dkoEtWsQyIGRZUXTPI6sHUNLR-l7L6LVOyu5RAzlS0JnVNQTWLODUfXf3NqvFZO9nVGojjjnsA6eELyAYvfXe9XtmOh-21bXsW3ID4zjIw0fNtb-X6vrMZLPgeD8VL18Ebz3cc23ftwA1Www_jW4yh)
**Triggers:**
- Push to `main` or `feature_001` branches
- Merged pull requests
- Manual workflow dispatch

**Required Secrets:**
```bash
VERCEL_TOKEN          # Vercel authentication token
VERCEL_ORG_ID         # Your Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project identifier
RENDER_DEPLOY_HOOK    # Render deployment webhook URL
```

### Manual Deployment

**Deploy Frontend to Vercel:**
```bash
cd client
npm install -g vercel
vercel --prod
```

**Deploy Backend to Render:**
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure build settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables from `.env.production`

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Watch mode for development
npm run test:watch
```

**Test Coverage:**
- Room creation and joining
- Real-time code synchronization
- Socket connection handling
- Copy to clipboard functionality

---

## 🛠️ Development

### Available Scripts

**Frontend (client/):**
```bash
npm start          # Development server (port 3000)
npm run build      # Production build
npm test           # Run tests
npm run lint       # Check code quality
npm run format     # Format code with Prettier
```

**Backend (server/):**
```bash
npm run dev        # Development with nodemon
npm start          # Production server
npm test           # Run server tests
npm run lint:fix   # Fix linting issues
```

### Environment Variables

**Client (`.env`):**
```bash
REACT_APP_BACKEND_URL=http://localhost:5555  # Backend API URL
```

**Server (`.env`):**
```bash
PORT=5555                                     # Server port
NODE_ENV=development                          # Environment
CORS_ORIGINS=http://localhost:3000           # Allowed origins
```

---

## 🎨 Features in Detail

### Code Execution
The code execution feature uses the Piston API to safely run code in isolated containers:

[![](https://mermaid.ink/img/pako:eNpNkctuwjAQRX_Fmm4DSgh5eVEJSEIrVSqi6qYJCysxEJHYkR8SFPj3Oo8ivBj5zpl7LY2vUPCSAoaDIO0RfWxzhsxZZN-SClTUVXGSaKvZDk0mr2iZpYIzRVmJpCkSdebdYFn2E6ssObeCSomWpDiZmZGuehpnm0oqztBi8z6CuAfJNTnTQquKs_vQT7r-7UsXhQm7oTSTquRa7Z5pIgQXN7TuGBViZGmf-JbFlWxrckGfWrUP43qAgxiqVJeamsR9Vdf4JbKTJLKfSTqSRRyHif9M1iNJ06W_csAyS6xKwEpoakFDRUM6CdfOk4M60obmgM21JOKUQ87uxtMS9sN5828TXB-OgPeklkbptiSKxhUx39M8usLslYoV10wBdqM-A_AVzoB9exp68_nMcQPbmTtOYMEFcOhOIyOD0AlmXhi6_t2C3_5Re-q5th-EruuEnhN50ez-B-CDnrY?type=png)](https://mermaid.live/edit#pako:eNpNkctuwjAQRX_Fmm4DSgh5eVEJSEIrVSqi6qYJCysxEJHYkR8SFPj3Oo8ivBj5zpl7LY2vUPCSAoaDIO0RfWxzhsxZZN-SClTUVXGSaKvZDk0mr2iZpYIzRVmJpCkSdebdYFn2E6ssObeCSomWpDiZmZGuehpnm0oqztBi8z6CuAfJNTnTQquKs_vQT7r-7UsXhQm7oTSTquRa7Z5pIgQXN7TuGBViZGmf-JbFlWxrckGfWrUP43qAgxiqVJeamsR9Vdf4JbKTJLKfSTqSRRyHif9M1iNJ06W_csAyS6xKwEpoakFDRUM6CdfOk4M60obmgM21JOKUQ87uxtMS9sN5828TXB-OgPeklkbptiSKxhUx39M8usLslYoV10wBdqM-A_AVzoB9exp68_nMcQPbmTtOYMEFcOhOIyOD0AlmXhi6_t2C3_5Re-q5th-EruuEnhN50ez-B-CDnrY)


**Features:**
- **Security**: Code runs in sandboxed environments
- **Multiple runtimes**: Latest versions of Python, C++, and JavaScript
- **Error handling**: Captures both stdout and stderr
- **Timeout protection**: Prevents infinite loops

### Real-Time Sync
Socket.IO events power the collaboration:

[![](https://mermaid.ink/img/pako:eNqNkj9vgzAQxb-KdVMikQhDCMRDlnbpjFgqFsu-ErfBTo3df1G-ew0oSdNGbRkQz_d777DPexBGIjDo8NmjFnireGN5W2sSnh23Tgm149qRihLekapDS-jPatkXS7QvaK9Yk5M1Gavju6Kz9bpk5NEoPbHGtHcyIj5gmrc4HZkyIBVlRGnlZv2_ToS3FkNqL75CyRiEcqLxdYgJpgczvdax987EhusGB_pK1i_IZdY2IJ43J_iov23gP1jyJ3bZWqpOGK1RuMuQ83o4jfNJQASNVRKYsx4jaNG2vJew7-01uA22WAMLn5LbpxpqfQieMMP7MJyjzRrfbIA98G0XlN9J7o635rQaBiTR3hivHTCaZ0MIsD28AVvG8yJbLBKa5jFdUJpH8A6sSOerIPOC5klWFOnyEMHH0DWeZ2m8zIs0pUVGV9kqOXwCYzDWSg?type=png)](https://mermaid.live/edit#pako:eNqNkj9vgzAQxb-KdVMikQhDCMRDlnbpjFgqFsu-ErfBTo3df1G-ew0oSdNGbRkQz_d777DPexBGIjDo8NmjFnireGN5W2sSnh23Tgm149qRihLekapDS-jPatkXS7QvaK9Yk5M1Gavju6Kz9bpk5NEoPbHGtHcyIj5gmrc4HZkyIBVlRGnlZv2_ToS3FkNqL75CyRiEcqLxdYgJpgczvdax987EhusGB_pK1i_IZdY2IJ43J_iov23gP1jyJ3bZWqpOGK1RuMuQ83o4jfNJQASNVRKYsx4jaNG2vJew7-01uA22WAMLn5LbpxpqfQieMMP7MJyjzRrfbIA98G0XlN9J7o635rQaBiTR3hivHTCaZ0MIsD28AVvG8yJbLBKa5jFdUJpH8A6sSOerIPOC5klWFOnyEMHH0DWeZ2m8zIs0pUVGV9kqOXwCYzDWSg)

**Key Events:**
- `join` - User joins a room
- `code-change` - Broadcasts code updates
- `language-change` - Syncs language selection
- `disconnected` - Handles user leaving
- `init-code` - Sends current state to new users

### Theme Support
Toggle between light and dark modes:

[![](https://mermaid.ink/img/pako:eNplkctugzAQRX_Fmm4hijGveFGpgapdpKoUpZtCFgTMQwGMjFGTEv69BtIoVWdhzbXvmfHYPcQ8YUAhE1GTo802rJGKp2CXs4qhHc-yku2Rrj-idf_RMoG8nBcxG2bfejy5bIoslxfkBS-FfO0OaNJoqrC_9_mROF6QH7zXDI35H4s3NXkOPHWft0IILtCW6YLVCRNXiz9bZjGvrTyXTLFpUZb0IZ1Ca6XgR0YfCCHXXP8qEplTozndY_4VM1wjJuYNs3ESpYd_pBbzkoupCWjqvYoEqBQd06BioopGCf1YPgQ5zhUCVWmi5gwhrAfFNFH9yXn1iwneZTnQNCpbpbomiSTzi0j9RHXbnef3eFdLoNgmUxGgPZyA2suFa5mmgYmzxCbGjgZnoC5ZrJR0XOwYlusSe9Dge-q6XFhkaTsuIdi18MpaGcMPbqOdAQ?type=png)](https://mermaid.live/edit#pako:eNplkctugzAQRX_Fmm4hijGveFGpgapdpKoUpZtCFgTMQwGMjFGTEv69BtIoVWdhzbXvmfHYPcQ8YUAhE1GTo802rJGKp2CXs4qhHc-yku2Rrj-idf_RMoG8nBcxG2bfejy5bIoslxfkBS-FfO0OaNJoqrC_9_mROF6QH7zXDI35H4s3NXkOPHWft0IILtCW6YLVCRNXiz9bZjGvrTyXTLFpUZb0IZ1Ca6XgR0YfCCHXXP8qEplTozndY_4VM1wjJuYNs3ESpYd_pBbzkoupCWjqvYoEqBQd06BioopGCf1YPgQ5zhUCVWmi5gwhrAfFNFH9yXn1iwneZTnQNCpbpbomiSTzi0j9RHXbnef3eFdLoNgmUxGgPZyA2suFa5mmgYmzxCbGjgZnoC5ZrJR0XOwYlusSe9Dge-q6XFhkaTsuIdi18MpaGcMPbqOdAQ)
- **GitHub Light**: Clean, bright interface
- **One Dark**: Popular dark theme for reduced eye strain

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes with clear messages:
   ```bash
   git commit -m "Add: amazing feature description"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Contribution Guidelines
- Follow the existing code style (ESLint + Prettier configured)
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

---

## 🗺️ Roadmap

[![](https://mermaid.ink/img/pako:eNptkU1PwzAMhv9K5PM2Nf1ebtNgAolJCMQB1Iu1mDZiTaYknYBp_510XdEE8yl-8_i1nRxgYySBgBq195VmIbzyW2LLoE_v1J7YDe1pa3Ytac-eDMoWdwMo0dPK2BY9Y68hpuv1cOFo45XR7LFBR4wP4kJK1au4ZQ-o6w5rcr3ORBzF2TTiEzYckoG_1Q3qDUl2G-qMZStC39lQc-bjkU-vNY0HcdmE4Z6_nKeWXcbZIxk9sgFfqbD5GnWY7bTuHzwd8fxay_PcL44sW3S-CQZqgyfgwiMbPYrzs9yzhXPK-X7ZfwPmI13CBGqrJAhvO5pAS-Hd-xQOvU8FoV9LFYhwlGg_Kqj0MdTsUL8Z045l1nR1A-Idty5k3a7_whuFtcX2V7WkJdml6bQHwfPiZALiAJ8g8mhWZmka86SIeMp5uPwCUSazeUiLkhdxVpZJfpzA96lrNMuSKC_KJOFlxufZPD7-AHP2sQo?type=png)](https://mermaid.live/edit#pako:eNptkU1PwzAMhv9K5PM2Nf1ebtNgAolJCMQB1Iu1mDZiTaYknYBp_510XdEE8yl-8_i1nRxgYySBgBq195VmIbzyW2LLoE_v1J7YDe1pa3Ytac-eDMoWdwMo0dPK2BY9Y68hpuv1cOFo45XR7LFBR4wP4kJK1au4ZQ-o6w5rcr3ORBzF2TTiEzYckoG_1Q3qDUl2G-qMZStC39lQc-bjkU-vNY0HcdmE4Z6_nKeWXcbZIxk9sgFfqbD5GnWY7bTuHzwd8fxay_PcL44sW3S-CQZqgyfgwiMbPYrzs9yzhXPK-X7ZfwPmI13CBGqrJAhvO5pAS-Hd-xQOvU8FoV9LFYhwlGg_Kqj0MdTsUL8Z045l1nR1A-Idty5k3a7_whuFtcX2V7WkJdml6bQHwfPiZALiAJ8g8mhWZmka86SIeMp5uPwCUSazeUiLkhdxVpZJfpzA96lrNMuSKC_KJOFlxufZPD7-AHP2sQo)

**Planned Features:**
- [ ] **Additional Languages**: Java, Go, Rust, TypeScript support
- [ ] **Enhanced Editor**: Auto-completion, bracket matching, code folding
- [ ] **Chat System**: In-room text chat for better collaboration
- [ ] **File Management**: Upload, download, and manage multiple files
- [ ] **Version History**: Track and restore previous code versions
- [ ] **User Authentication**: Optional accounts for saved preferences
- [ ] **Private Rooms**: Password-protected collaborative sessions
- [ ] **Code Templates**: Quick-start snippets for common patterns
- [ ] **Video/Audio**: WebRTC integration for voice/video chat
- [ ] **AI Assistance**: Code suggestions and error explanations

**Want to contribute?** Check out [open issues](https://github.com/ShubhamHarkare/Code-Hive/issues) or propose new features!

---

## 📊 Performance

`[![](https://mermaid.ink/img/pako:eNo9jlFrwyAUhf-KXBhkLA2a1EZlb90eB6NjL8MXSW5bWdVgDLQr_e-zpel98ly_c849Qxd6BAWDRZJsOiD5xLgN0RnfIfnAFG03ak_yaNigOSySdUi-Tr4jxSuj1I3PGogiks_UOieS9yN2U7LBk6Je8DsjHswmBEfWZjCdTSdSMPpCphHjnEVn7nu41RVSVvLp_imhhF20PagUJyzBYb72KuF8tWlIe3SoQeVnb-KvBu0v2TMY_5NrZ1sM024PamsOY1bT0JuEb9bsonGPbUTfY1yHySdQrGW3EFBnOIJa0Urw5bJmTUvZkrG2hBMo0VQyy1awtuZCNKtLCX-3Vlrxhq5a0TRMcCa5rC__Of9vuQ?type=png)](https://mermaid.live/edit#pako:eNo9jlFrwyAUhf-KXBhkLA2a1EZlb90eB6NjL8MXSW5bWdVgDLQr_e-zpel98ly_c849Qxd6BAWDRZJsOiD5xLgN0RnfIfnAFG03ak_yaNigOSySdUi-Tr4jxSuj1I3PGogiks_UOieS9yN2U7LBk6Je8DsjHswmBEfWZjCdTSdSMPpCphHjnEVn7nu41RVSVvLp_imhhF20PagUJyzBYb72KuF8tWlIe3SoQeVnb-KvBu0v2TMY_5NrZ1sM024PamsOY1bT0JuEb9bsonGPbUTfY1yHySdQrGW3EFBnOIJa0Urw5bJmTUvZkrG2hBMo0VQyy1awtuZCNKtLCX-3Vlrxhq5a0TRMcCa5rC__Of9vuQ)

- **Real-time sync latency**: <100ms
- **Room capacity**: 10+ concurrent users per room
- **Code execution**: 2-5 seconds depending on language
- **Uptime**: 99.9% (monitored via Vercel/Render)

---

## 🐛 Known Issues

- **Safari WebSocket**: Occasional connection issues on iOS Safari (workaround: reload page)
- **Large Files**: Files >1MB may cause performance degradation

Report bugs: [GitHub Issues](https://github.com/ShubhamHarkare/Code-Hive/issues)

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR**: You can freely use, modify, and distribute this software with attribution.

---

## 👨‍💻 Author

**Shubham Harkare**

- GitHub: [@ShubhamHarkare](https://github.com/ShubhamHarkare)
- Project: [Code-Hive](https://github.com/ShubhamHarkare/Code-Hive)
- Live Demo: [code-hive.vercel.app](https://code-hive.vercel.app)

---

## 🙏 Acknowledgments

Special thanks to:
- [React](https://reactjs.org/) - UI framework
- [Socket.IO](https://socket.io/) - Real-time engine
- [CodeMirror](https://codemirror.net/) - Code editor component
- [Piston](https://github.com/engineer-man/piston) - Code execution API
- [Vercel](https://vercel.com/) - Frontend hosting
- [Render](https://render.com/) - Backend hosting

---

## ⭐ Star This Project

If you find Code-Hive useful, please give it a star! It helps others discover the project and motivates continued development.

[![GitHub stars](https://img.shields.io/github/stars/ShubhamHarkare/Code-Hive?style=social)](https://github.com/ShubhamHarkare/Code-Hive/stargazers)

---

<div align="center">
  <strong>Built with ❤️ by Shubham Harkare</strong>
  <br>
  <sub>Happy Collaborative Coding! 🐝</sub>
</div>
