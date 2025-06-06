# 🇮🇳 GramConnect - Digital Gram Panchayat Platform

A full-stack web application to digitally empower rural governance. **GramConnect** is built to simplify and modernize certificate management, grievance handling, community engagement, government schemes, and local administration for villagers, gramsevaks, and sarpanches.

> 🛠 Built with the MERN stack: MongoDB, Express.js, React.js, Node.js

---

## 📌 Project Highlights

- 🧾 **Apply for Certificates** online & track status
- 🗣 **Raise Grievances** and get timely resolution
- 📢 **View Notices**, schemes, announcements
- 👥 **Join Volunteer Programs** and attend events
- 🧑‍💼 **Role-based Dashboards** for citizen, sarpanch & gramsevak
- 🧠 **AI Features (Planned)**: Translation, chatbot, QR certificate validation

---

## 🏗️ Architecture

This is a **MERN stack** project:
React.js (Frontend)
↕️
Express.js + Node.js (Backend API)
↕️
MongoDB (Database)

yaml
Copy
Edit

- Backend: Node.js REST API with JWT auth & role-based access
- Frontend: React app hosted on Vercel
- Database: MongoDB Atlas

---

## 🧑‍💻 Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | React.js, Axios, Tailwind CSS |
| Backend    | Node.js, Express.js           |
| Database   | MongoDB, Mongoose             |
| Auth       | JWT + Role Middleware         |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 🚀 Getting Started

### 🛠 Prerequisites

- Node.js & npm installed
- MongoDB URI (MongoDB Atlas or local)
- Git

---

### 🧩 1. Clone the Repository

```bash
git clone https://github.com/pradyumyelame/GramConnect.git
cd GramConnect
📦 2. Setup Backend
bash
Copy
Edit
cd backend
npm install
Create a .env file:

env
Copy
Edit
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
Run the backend server:

bash
Copy
Edit
npm start
💻 3. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
Update API URLs in .env or Axios configuration if needed (example http://localhost:5000/api).

Start the frontend:

bash
Copy
Edit
npm start
Now visit: http://localhost:3000

🔐 Authentication Roles
👤 Citizen: Can apply for documents, file grievances, register for events

🧑‍💼 Sarpanch / Gramsevak (Admin): Can approve/reject applications, post notices, manage grievances, add schemes

All secure routes use Authorization: Bearer <JWT> headers.

🔗 Live Links
🌍 Frontend: https://gram-connect.vercel.app

⚙️ Backend: [Hosted on Render/Railway]

📁 Features & Modules
Module	Description
🧾 Certificates	Citizens apply, admins approve/reject & download PDFs
📣 Grievances	Real-time tracking of submitted issues
📜 Notices	Village-wide announcements managed by admins
🧑‍🤝‍🧑 Community	Volunteer programs, event registration, meetings, projects
🗺️ Schemes	Government schemes listed, updated by admin roles
🌐 Multilingual	Language switching (Marathi, Hindi, English) [in progress]
🧠 AI Chatbot	Health/legal help chatbot (future integration planned)

🧪 Testing
Unit tested backend with Postman

Manual testing done for all roles on local and production builds

Ready for Cypress-based UI tests (optional)

🔄 Future Roadmap
 PDF certificate generator with QR verification

 Live chat and chatbot with multilingual support

 Push notifications (PWA)

 Offline data caching

 Admin dashboard with analytics

🙌 Contributors
👨‍💻 Developed by a student team:

Pradum Yelame – Backend & API Integration

 – Frontend, design, deployment

Want to contribute? Fork the repo and open a pull request!

🧾 License
This project is built for academic and educational use. Not for commercial deployment.

📬 Contact
For queries or suggestions:
📧 yelamepradum36@gmail.com
🔗 pradyumyelame


