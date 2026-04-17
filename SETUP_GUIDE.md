# Vedteix Technology - Project Setup & Deployment Guide

## 🚨 **CRITICAL SECURITY FIXES APPLIED**

This guide includes all the security fixes that have been applied to your codebase.

---

## 📋 **Table of Contents**

1. [Prerequisites](#prerequisites)
2. [Security Fixes Summary](#security-fixes-summary)
3. [Environment Variables Setup](#environment-variables-setup)
4. [Local Development Setup](#local-development-setup)
5. [Building for Production](#building-for-production)
6. [Vercel Deployment](#vercel-deployment)
7. [Backend Deployment](#backend-deployment)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 **Prerequisites**

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **MongoDB** database (MongoDB Atlas recommended)
- **Git** for version control
- **Vercel account** (for frontend deployment)

---

## 🔒 **Security Fixes Summary**

### **Critical Issues Fixed:**

1. ✅ **Removed Hardcoded Credentials**
   - Removed MongoDB URI, email credentials, and JWT secret from `app.js`
   - Moved all sensitive data to environment variables

2. ✅ **Added Input Validation**
   - Email format validation
   - Password strength requirements (8+ chars, letter + number)
   - Name validation (2-100 chars, alphanumeric only)
   - Request body size limits (10MB)

3. ✅ **Rate Limiting**
   - Login attempts limited to 5 per IP
   - 15-minute lockout after max attempts
   - Prevents brute force attacks

4. ✅ **CORS Configuration**
   - Restricted to frontend domain only
   - Credentials enabled for secure cookie handling

5. ✅ **Error Handling**
   - Generic error messages to prevent information leakage
   - User enumeration prevention (same error for invalid user/password)

6. ✅ **Cookie Security**
   - `httpOnly` flag enabled
   - `secure` flag in production
   - `sameSite: 'strict'` for CSRF protection

7. ✅ **Environment Variable Validation**
   - Server exits if required env vars are missing
   - Clear error messages for missing configuration

---

## 🔐 **Environment Variables Setup**

### **Frontend Environment Variables** (`.env.local` in `vedteix-frontend/`)

Create a `.env.local` file in the `vedteix-frontend` directory:

```env
# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
BACKEND_URL=http://localhost:5001

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-22

# Node Environment
NODE_ENV=development
```

### **Backend Environment Variables** (`.env` in `vedteix-backend/`)

Create a `.env` file in the `vedteix-backend` directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:1404

# Seeded Admin User
ADMIN_NAME=Vedteix Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_a_strong_admin_password
ADMIN_SYNC_PASSWORD=true

# Email Configuration (for nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=alerts@example.com
```

### **⚠️ Important Security Notes:**

1. **Never commit `.env` files to Git** - They are already in `.gitignore`
2. **Generate strong JWT secrets** - Use at least 32 random characters
3. **Use MongoDB Atlas** - Don't expose MongoDB directly to the internet
4. **Use App Passwords for Gmail** - Don't use your regular Gmail password

---

## 🚀 **Local Development Setup**

### **Step 1: Clean Git Repository**

First, remove large files from Git tracking:

```bash
# Navigate to project root
cd C:\Users\prath\Vedteix-technology

# Remove .next directory from Git (if already tracked)
git rm -r --cached vedteix-frontend/.next

# Remove node_modules from Git (if already tracked)
git rm -r --cached vedteix-frontend/node_modules
git rm -r --cached vedteix-backend/node_modules

# Commit the removal
git commit -m "Remove build artifacts and node_modules from Git"

# Push to remote
git push origin main
```

### **Step 2: Install Frontend Dependencies**

```bash
cd vedteix-frontend
npm install --legacy-peer-deps
```

### **Step 3: Install Backend Dependencies**

```bash
cd ../vedteix-backend
npm install
```

### **Step 4: Set Up Environment Variables**

1. Copy the environment variable templates above
2. Create `.env.local` in `vedteix-frontend/`
3. Create `.env` in `vedteix-backend/`
4. Fill in your actual values

### **Step 5: Start Backend Server**

```bash
cd vedteix-backend
npm run dev
```

The backend should start on `http://localhost:5001`

### **Step 6: Start Frontend Development Server**

```bash
cd vedteix-frontend
npm run dev
```

The frontend should start on `http://localhost:1404`

---

## 🏗️ **Building for Production**

### **Frontend Build**

```bash
cd vedteix-frontend
npm run build
```

This creates an optimized production build in the `.next` directory.

### **Test Production Build Locally**

```bash
cd vedteix-frontend
npm start
```

---

## ☁️ **Vercel Deployment**

### **Step 1: Install Vercel CLI**

```bash
npm install -g vercel
```

### **Step 2: Login to Vercel**

```bash
vercel login
```

### **Step 3: Deploy Frontend**

```bash
cd vedteix-frontend
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No** (first time) or **Yes** (if updating)
- Project name? **vedteix-frontend** (or your choice)
- Directory? **./** (current directory)
- Override settings? **No**

### **Step 4: Configure Environment Variables in Vercel**

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add all environment variables from your `.env.local`:
   - `NEXT_PUBLIC_BACKEND_URL` (your backend URL)
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `NODE_ENV=production`

### **Step 5: Redeploy**

After adding environment variables, trigger a new deployment:

```bash
vercel --prod
```

Or push to your main branch (if connected to Git).

---

## 🖥️ **Backend Deployment**

Vercel is primarily for frontend/Next.js apps. For your Node.js/Express backend, consider:

### **Option 1: Railway** (Recommended - Easy Setup)

1. Go to [Railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repository
4. Select the `vedteix-backend` directory
5. Add environment variables in Railway dashboard
6. Deploy!

### **Option 2: Render**

1. Go to [Render.com](https://render.com)
2. Create a new Web Service
3. Connect your repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy!

### **Option 3: Heroku**

1. Install Heroku CLI
2. Create a new app: `heroku create your-app-name`
3. Set environment variables: `heroku config:set KEY=value`
4. Deploy: `git push heroku main`

### **Backend Environment Variables for Production**

Make sure to set:
- `MONGODB_URI` (your production MongoDB connection string)
- `JWT_SECRET` (strong random string)
- `FRONTEND_URL` (your Vercel frontend URL, e.g., `https://your-app.vercel.app`)
- `PORT` (usually auto-set by hosting platform)
- `NODE_ENV=production`
- `EMAIL_USER` and `EMAIL_PASS`

---

## 🐛 **Troubleshooting**

### **Issue: "Cannot find module" errors**

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### **Issue: Build fails with Sanity errors**

**Solution:**
- Ensure all Sanity environment variables are set
- Check `sanity.config.ts` for correct paths
- Try: `npm install sanity@latest next-sanity@latest --legacy-peer-deps`

### **Issue: Backend connection errors**

**Solution:**
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist (allow all IPs: `0.0.0.0/0` for testing)
- Ensure backend is running on the correct port

### **Issue: CORS errors**

**Solution:**
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check CORS configuration in `app.js`

### **Issue: Login not working**

**Solution:**
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set correctly
- Check browser console for errors
- Verify cookies are being set (check DevTools → Application → Cookies)

### **Issue: Git push fails with large files**

**Solution:**
```bash
# Remove large files from Git
git rm -r --cached vedteix-frontend/.next
git rm -r --cached vedteix-frontend/node_modules
git commit -m "Remove large files"
git push
```

---

## 📝 **Project Structure**

```
Vedteix-technology/
├── vedteix-frontend/          # Next.js frontend
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── components/       # React components
│   │   └── lib/              # Utilities and helpers
│   ├── public/               # Static assets
│   ├── .env.local           # Frontend environment variables (NOT in Git)
│   └── package.json
│
├── vedteix-backend/          # Express.js backend
│   ├── controllers/          # Route controllers
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── middlewares/          # Express middlewares
│   ├── .env                  # Backend environment variables (NOT in Git)
│   └── package.json
│
└── .gitignore                # Git ignore rules
```

---

## ✅ **Security Checklist**

Before deploying to production, ensure:

- [ ] All environment variables are set
- [ ] No hardcoded credentials in code
- [ ] `.env` files are in `.gitignore`
- [ ] Strong JWT secret (32+ characters)
- [ ] MongoDB connection string is secure
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled
- [ ] Input validation is in place
- [ ] Error messages don't leak sensitive info
- [ ] HTTPS is enabled (Vercel does this automatically)

---

## 🎯 **Quick Start Commands**

```bash
# Frontend
cd vedteix-frontend
npm install --legacy-peer-deps
npm run dev

# Backend (in another terminal)
cd vedteix-backend
npm install
npm run dev

# Build frontend
cd vedteix-frontend
npm run build

# Deploy to Vercel
cd vedteix-frontend
vercel --prod
```

---

## 📞 **Support**

If you encounter issues:
1. Check the troubleshooting section above
2. Review error logs in console
3. Verify all environment variables are set
4. Ensure dependencies are installed correctly

---

**Last Updated:** 2026-04-08
**Version:** 1.0.0


<!-- 
frontend 
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
BACKEND_URL=http://localhost:5001
NEXT_PUBLIC_SESSION_COOKIE_NAME=vedteix.sid
NEXT_PUBLIC_SANITY_PROJECT_ID=

NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-22 -->

<!-- 
backend 

PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
SESSION_SECRET=oEATFeT2sxR0cWouubEDWFX2tyLvP1f/x1V95KSR+XNDpSL6e5XQj4yrLQJUMx5L
SESSION_COOKIE_NAME=vedteix.sid
SESSION_MAX_AGE_MS=604800000
FRONTEND_URL=http://localhost:1404
BACKEND_PUBLIC_URL=http://localhost:5001
SESSION_COOKIE_NAME=vedteix.sid
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash
MEETING_LINK_BASE=https://meet.google.com/new
ADMIN_NAME=Vedteix Admin
ADMIN_EMAIL=admin@vedteix.com
ADMIN_PASSWORD=your_secure_admin_password
ADMIN_SYNC_PASSWORD=true
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=admin@example.com
GOOGLE_CLIENT_ID=1080765228404-juurifadinl5jh1k0s593v1f5b5lck2j.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=dacib7c17
CLOUDINARY_API_KEY=275957479576414
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=vedteix       
CLOUDINARY_FOLDER_TESTIMONIALS=vedteix/testimonials
CLOUDINARY_FOLDER_SERVICES=vedteix/services
CLOUDINARY_FOLDER_BLOGS=vedteix/blogs
CLOUDINARY_FOLDER_PORTFOLIO=vedteix/portfolio
CLOUDINARY_FOLDER_CAREERS=vedteix/careers
CLOUDINARY_FOLDER_CONTACT=vedteix/contact
CLOUDINARY_FOLDER_ABOUT=vedteix/about
CLOUDINARY_FOLDER_HOME=vedteix/home
CLOUDINARY_FOLDER_TECHNOLOGIES=vedteix/technologies


PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
SESSION_SECRET=oEATFeT2sxR0cWouubEDWFX2tyLvP1f/x1V95KSR+XNDpSL6e5XQj4yrLQJUMx5L
FRONTEND_URL=http://localhost:1404
BACKEND_PUBLIC_URL=http://localhost:5001
SESSION_COOKIE_NAME=vedteix.sid
SESSION_MAX_AGE_MS=604800000

# Optional: Google OAuth
GOOGLE_CLIENT_ID=1080765228404-juurifadinl5jh1k0s593v1f5b5lck2j.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5001/auth/google/callback

# Bootstrap admin (optional)
ADMIN_NAME=Vedteix Admin
ADMIN_EMAIL=admin@vedteix.com
ADMIN_PASSWORD=your_secure_admin_password
ADMIN_SYNC_PASSWORD=true

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=admin@example.com

# Cloudinary (image uploads)
CLOUDINARY_CLOUD_NAME=dacib7c17
CLOUDINARY_API_KEY=275957479576414
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=vedteix       
CLOUDINARY_FOLDER_TESTIMONIALS=vedteix/testimonials
CLOUDINARY_FOLDER_SERVICES=vedteix/services
CLOUDINARY_FOLDER_BLOGS=vedteix/blogs
CLOUDINARY_FOLDER_PORTFOLIO=vedteix/portfolio
CLOUDINARY_FOLDER_CAREERS=vedteix/careers
CLOUDINARY_FOLDER_CONTACT=vedteix/contact
CLOUDINARY_FOLDER_ABOUT=vedteix/about
CLOUDINARY_FOLDER_HOME=vedteix/home
CLOUDINARY_FOLDER_TECHNOLOGIES=vedteix/technologies




# AI chat (Google Gemini). Required for smart replies; without it, scripted replies are used.
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash

# Appointment meeting links: default is https://meet.google.com/new
# Or set a custom base, e.g. https://meet.vedteix.com
MEETING_LINK_BASE=https://meet.google.com/new





 -->
