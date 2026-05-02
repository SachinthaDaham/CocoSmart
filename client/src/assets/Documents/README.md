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

Set `UPLOAD_PASSWORD` in `server/.env` before using document upload/delete.

3. Frontend setup:

```bash
cp client/.env.example client/.env
npm install --prefix client
```

4. Start both apps:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5050


