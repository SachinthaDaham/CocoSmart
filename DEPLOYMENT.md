# Deployment Guide

## Local Development

### Server Setup
1. Create `server/.env` file:
   ```
   PORT=5050
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster/cocosmart?retryWrites=true&w=majority
   UPLOAD_PASSWORD=your_secure_password
   ```

2. Install dependencies:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

3. Run development servers:
   ```bash
   npm run dev
   ```
   - Client: http://localhost:5173 (or 5174 if port is taken)
   - Server: http://localhost:5050

### Client Environment
- A `.env.local` file has been created for local development
- It points to the local server at `http://localhost:5050/api`
- For production, use `.env.production` with your deployed server URL

## Production Deployment

### Option 1: Deploy Client to GitHub Pages + External Backend

**Client Deployment (GitHub Pages):**

1. Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build --prefix client
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./client/dist
   ```

2. Create `client/.env.production`:
   ```
   VITE_API_URL=https://your-deployed-server.com/api
   ```
   Replace `https://your-deployed-server.com` with your actual server URL

**Server Deployment Options:**
- **Render.com** (Recommended - free tier available)
- **Railway.app**
- **Fly.io**
- **AWS / DigitalOcean**

### Option 2: Deploy to Vercel (Recommended)

Vercel automatically handles both client and can proxy to backend:

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. For production, ensure `VITE_API_URL` points to your backend server

### Environment Variables Summary

**Server (.env or Platform Settings):**
- `PORT`: Server port (default: 5050)
- `MONGO_URI`: MongoDB connection string
- `UPLOAD_PASSWORD`: Password for document uploads
- `MAX_UPLOAD_SIZE_MB`: Max file size (default: 50)

**Client (.env.local or .env.production):**
- `VITE_API_URL`: Backend API URL
  - Local: `http://localhost:5050/api`
  - Production: `https://your-backend-domain.com/api`

## MongoDB Atlas Setup

1. Create account at mongodb.com/atlas
2. Create free tier cluster
3. Add IP address to whitelist (allow 0.0.0.0/0 for development)
4. Create database user
5. Get connection string and add to your `.env` files

## Notes

- **Never commit `.env` files** - they contain secrets
- Use `.env.example` files to document what variables are needed
- For GitHub Pages, the client is static - the server must be hosted separately
- The document download feature works by calling `/api/documents/:id/download`
- All uploaded documents are stored in `server/uploads/` directory
