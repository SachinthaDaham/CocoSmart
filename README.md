# CocoSmart MERN Website

This project recreates the Coconut Pest and Disease Surveillance research website using the MERN stack.

## Stack

- MongoDB (optional for local message persistence)
- Express + Node.js backend API
- React + Vite frontend

## Project Structure

- `client/` - React frontend
- `server/` - Express backend

## Setup

1. Install root tools:

```bash
npm install
```

2. Backend setup:

```bash
cp server/.env.example server/.env
npm install --prefix server
```

3. Frontend setup:

```bash
cp client/.env.example client/.env.local
npm install --prefix client
```

4. Start both apps:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5050

## Environment Variables

### Server (`server/.env`)

- `PORT` - Server port (default: 5050)
- `MONGO_URI` - MongoDB connection string (Atlas or local)
- `UPLOAD_PASSWORD` - Password for document uploads/deletions
- `MAX_UPLOAD_SIZE_MB` - Maximum file upload size (default: 50)

### Client (`client/.env.local` or `.env.production`)

- `VITE_API_URL` - Backend API URL
  - Local: `http://localhost:5050/api`
  - Production: Your deployed server URL

## Deployment

For deployment to GitHub Pages or other hosting, see [DEPLOYMENT.md](DEPLOYMENT.md)

Key points:

- **Client** can be deployed to GitHub Pages (static)
- **Server** must be deployed separately (e.g., Render, Railway, Fly.io)
- Set `VITE_API_URL` in production to point to your backend server
- Use `.env.production` for production environment variables

## API

- `GET /api/health`
- `POST /api/contact` with payload:

```json
{
  "name": "Your Name",
  "email": "email@example.com",
  "message": "Your message"
}
```
