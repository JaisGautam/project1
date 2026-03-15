🌱 AI Sustainability Platform
One Complete Solution for AI-Powered Sustainable Business Tools

📋 Project Overview
Ye ek full-stack application hai jo Google Gemini AI ka use karke do main features provide karti hai:

🎯 Main Features
🤖 AI Category Generator - Products ko automatically categorize karta hai

📊 AI Proposal Generator - Sustainable B2B proposals create karta hai

🛠️ Tech Stack (Kya Use Kiya Hai)
Layer Technology Kaam
Backend NestJS + MongoDB API + Database
Frontend React + Vite UI + User Interaction
AI Google Gemini 2.5 Flash AI Processing
Styling Tailwind CSS Design
HTTP Client Axios API Calls
📁 Project Structure (Folder System)
text
ai-sustainability-platform/
│
├── server/ # Backend (NestJS)
│ ├── src/
│ │ ├── ai/ # Gemini AI integration
│ │ ├── modules/ # Features
│ │ │ ├── category/ # Category module
│ │ │ └── proposal/ # Proposal module
│ │ ├── database/ # MongoDB schemas
│ │ └── config/ # Environment config
│ └── .env # API keys, DB URL
│
└── client/ # Frontend (React)
└── fronted/
├── src/
│ ├── pages/ # Home, Category, Proposal
│ ├── components/ # Reusable UI components
│ └── services/ # API calls
└── package.json
🚀 Setup Guide (Chalane Ka Tarika)
Prerequisites (Pehle Ye Install Karein)
✅ Node.js (v18+)

✅ MongoDB (v7+)

✅ Git

Step 1: Gemini API Key Lein (Free)
Google AI Studio par jao: https://aistudio.google.com

Gmail se login karo

"Get API Key" click karo

Copy karo (kuch aisa: AIzaSyB-xxxxxxxxxxx)

Step 2: Backend Setup
bash

# 1. Server folder mein jao

cd server

# 2. Dependencies install karo

npm install

# 3. .env file banao

# File: server/.env

PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-sustainability
GEMINI_API_KEY=AIzaSyB-xxxxxxxxxxx # Apni key yahan dalo

# 4. Server start karo

npm run start:dev
Step 3: Frontend Setup
bash

# 1. New terminal open karo

cd client/fronted

# 2. Dependencies install karo

npm install

# 3. Frontend start karo

npm run dev
Step 4: Browser Mein Open Karo
text
Frontend: http://localhost:5173
Backend API: http://localhost:5000
Health Check: http://localhost:5000/health
📡 API Endpoints (Backend Routes)
Category APIs
Method URL Body Response
POST /category/generate { "productName": "Bamboo Brush", "description": "Eco-friendly..." } Category + Tags
GET /category/recent - Recent 10 products
Proposal APIs
Method URL Body Response
POST /proposal/generate { "budget": 50000, "companyType": "Corporate", "sustainabilityGoals": ["plastic-free"] } Product mix + Impact
GET /proposal/recent - Recent 10 proposals
🎨 Frontend Pages (User Interface)

1. Home Page (/)
   Platform ka introduction

Navigation to features

2. Category Generator (/category)
   Product name + description input

AI se category, tags, filters generate

Result show in beautiful card

3. Proposal Generator (/proposal)
   Budget + company type input

AI se product mix + impact calculate

Budget breakdown + environmental impact

🔧 Environment Variables (Config Files)
Backend - server/.env
env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-sustainability
GEMINI_API_KEY=AIzaSyB-xxxxxxxxxxx
Frontend - client/fronted/.env.local
env
VITE_API_URL=http://localhost:5000
🧪 Testing - Kaam Kar Raha Hai? Check Karo
Backend Test
bash
curl http://localhost:5000/health

# Response: { "status": "OK", ... }

Category Test
bash
curl -X POST http://localhost:5000/category/generate \
 -H "Content-Type: application/json" \
 -d '{"productName":"Bamboo Toothbrush","description":"Eco-friendly toothbrush"}'
Proposal Test
bash
curl -X POST http://localhost:5000/proposal/generate \
 -H "Content-Type: application/json" \
 -d '{"budget":50000,"companyType":"Corporate Gifting"}'
📦 Dependencies (Kya Install Hua)
Backend Dependencies
json
{
"@nestjs/core": "^10.0.0",
"@nestjs/mongoose": "^10.0.0",
"mongoose": "^7.0.0",
"openai": "^4.0.0"
}
Frontend Dependencies
json
{
"react": "^18.2.0",
"react-router-dom": "^6.0.0",
"axios": "^1.6.0",
"react-hot-toast": "^2.4.0",
"react-icons": "^4.11.0"
}
❓ Common Issues & Solutions
Error: "GEMINI_API_KEY not defined"
✅ Solution: .env file mein API key dalo aur server restart karo

Error: "MongoDB connection failed"
✅ Solution: MongoDB start karo (mongod command se)

Error: "404 Not Found"
✅ Solution: URL check karo - /category/generate (singular) use karo

🎯 Features Summary
Feature Working? Description
✅ Category Generation ✓ AI se product category + tags
✅ Proposal Generation ✓ AI se product mix + budget
✅ Database Save ✓ MongoDB mein data save
✅ Frontend UI ✓ React + Tailwind
✅ Error Handling ✓ Proper error messages
✅ Logging ✓ All AI calls logged
📝 Quick Commands Cheat Sheet
bash

# Backend start

cd server && npm run start:dev

# Frontend start

cd client/fronted && npm run dev

# MongoDB start

mongod

# Install all dependencies

npm install
🤝 Contributing (Agar Kuch Add Karna Ho)
Fork karo project

New branch banao: git checkout -b feature/YourFeature

Changes commit karo

Push karo: git push origin feature/YourFeature

Pull request kholo

📞 Contact
Developer: Amit kumar
Email: gautamjais574@gmail.com
GitHub: @JaisGuatam

📄 License
MIT License - Use karne ke liye free hai

⭐ Agar Project Achha Laga to GitHub par Star Zaroor Dein ⭐
