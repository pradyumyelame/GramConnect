# GramPanchayat Backend

This is the backend server for the GramPanchayat project, providing RESTful APIs for user authentication, certificate/document management, grievance redressal, community services, government schemes, and notices.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Important Notes](#important-notes)

---

## Features

- User & Admin authentication (JWT-based)
- Certificate/document application and review
- Grievance submission and admin management
- Community features: meetings, projects, events, volunteer programs, announcements
- Government schemes listing and management
- Notice board for village-level announcements

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- CORS for frontend-backend communication

## Project Structure

```
backend/
  .env
  package.json
  server.js
  config/
    db.js
  controllers/
    authController.js
    certificateController.js
    communityController.js
    grievanceController.js
    schemeController.js
  models/
    Certificate.js
    CommunityService.js
    Grievance.js
    Notice.js
    Scheme.js
    TokenBlacklist.js
    Users.js
  routes/
    authRoutes.js
    certificateRoutes.js
    communityRoutes.js
    grievanceRoutes.js
    noticeRoutes.js
    schemeRoutes.js
  middlewares/
    auth.js
    authMiddleware.js
  pdfs/
  scripts/
  utils/
```

## Setup & Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values (see below).

## Environment Variables

Create a `.env` file in the backend root with the following:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

## Running the Server

```sh
npm start
```
The server will run on the port specified in `.env` (default: 5000).

## API Endpoints

### Auth (`/api/auth`)
- `POST /register/citizen` — Register a new citizen
- `POST /register/admin` — Register a new admin (sarpanch/gramsevak)
- `POST /login/citizen` — Citizen login
- `POST /login/admin` — Admin login
- `POST /logout` — Logout (JWT blacklist)

### Certificates (`/api/certificates`)
- `POST /apply` — Apply for a certificate (user)
- `GET /my` — Get my certificate applications (user)
- `GET /all` — Get all applications (admin)
- `PATCH /approve/:id` — Approve application (admin)
- `PATCH /reject/:id` — Reject application (admin)

### Grievances (`/api/grievances`)
- `POST /` — Submit a grievance
- `GET /user?phone=...` — Get grievances by phone
- `GET /admin` — Get all grievances (admin)
- `PUT /admin/:id` — Update grievance status/comments (admin)
- `GET /counts` — Get grievance counts (admin)

### Schemes (`/api/schemes`)
- `GET /` — List all schemes
- `POST /` — Add a new scheme (admin)
- `PUT /:id` — Update a scheme (admin)
- `DELETE /:id` — Delete a scheme (admin)

### Community (`/api/community`)
- `POST/GET /meeting-minutes` — Add/get meeting minutes
- `POST/GET /project-updates` — Add/get project updates
- `POST /event-registrations` — Register for event
- `GET /event-registrations/:eventId` — Get event registrations
- `POST/GET /volunteer-programs` — Add/get volunteer programs
- `POST/GET /announcements` — Add/get announcements

### Notices (`/api/notices`)
- `GET /` — Get all notices
- `GET /:id` — Get notice by ID
- `POST /` — Create notice (admin)
- `PUT /:id` — Update notice (admin)
- `DELETE /:id` — Delete notice (admin)

## Authentication & Authorization

- JWT-based authentication is used.
- Use the `Authorization: Bearer <token>` header for protected/admin routes.
- Admin routes require roles: `sarpanch`, `gramsevak`, or `admin`.

## Important Notes

- **CORS** is configured for the deployed frontend (`https://gram-connect.vercel.app`). Update in `server.js` if needed.
- **Database**: Uses MongoDB Atlas by default. Update `MONGO_URI` for your environment.
- **Token Blacklisting**: On logout, tokens are blacklisted to prevent reuse.
- **Role Management**: Only one admin per role (`sarpanch`, `gramsevak`) is allowed.
- **Error Handling**: All endpoints return appropriate HTTP status codes and error messages.

## License

This project is for educational and demonstration purposes.

---

For any issues or contributions, please open an issue or pull request.