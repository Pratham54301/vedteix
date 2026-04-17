# Vedteix Deployment Guide

This repo has two deployable apps:

- Frontend: `vedteix-frontend` - Next.js, deploy to Vercel.
- Backend: `vedteix-backend` - Express + MongoDB, deploy to Railway.

Deploy the backend first so you have the Railway API URL for the frontend environment variables.

Official references:

- Vercel build settings: https://vercel.com/docs/deployments/configure-a-build
- Vercel environment variables: https://vercel.com/docs/environment-variables
- Railway start command: https://docs.railway.com/deployments/start-command
- Railway monorepo root directory: https://docs.railway.com/guides/monorepo

## 1. Local Preflight

Run these before pushing:

```bash
cd vedteix-frontend
npm ci
npm run lint
npm run check-types
npm run build
```

```bash
cd ../vedteix-backend
npm ci
npm audit --audit-level=moderate
node -e "const fs=require('fs');const path=require('path');const root=process.cwd();function walk(dir){let out=[];for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.name==='node_modules') continue;const full=path.join(dir,entry.name);if(entry.isDirectory()) out=out.concat(walk(full));else if(entry.name.endsWith('.js')&&entry.name!=='app.js') out.push(full);}return out;}for(const file of walk(root)){require(file)}console.log('backend modules ok')"
```

Do not commit real `.env` values. Use `.env.example` only for placeholders.

## 2. Backend on Railway

Create the Railway service from the same GitHub repository.

Settings:

- Root Directory: `vedteix-backend`
- Install Command: `npm ci`
- Start Command: `npm start`
- Healthcheck Path: `/health`

Do not hardcode `PORT`. Railway injects `PORT`, and `app.js` already reads `process.env.PORT`.

Required Railway variables:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
SESSION_SECRET=generate_a_long_random_secret
FRONTEND_URL=https://your-vercel-domain.vercel.app
BACKEND_PUBLIC_URL=https://your-railway-domain.up.railway.app
SESSION_COOKIE_NAME=vedteix.sid
SESSION_MAX_AGE_MS=604800000
```

Generate a strong session secret locally:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

Optional Railway variables:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=https://your-railway-domain.up.railway.app/auth/google/callback

ADMIN_NAME=Admin
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SYNC_PASSWORD=false

EMAIL_HOST=
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=
EMAIL_TO=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
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

GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash
MEETING_LINK_BASE=
```

MongoDB Atlas checklist:

- Use a production database, not a local MongoDB URL.
- Add Railway outbound access in Atlas Network Access. If you use `0.0.0.0/0`, compensate with a strong database password and least-privilege database user.
- Confirm the database user has read/write access to the Vedteix database.

After Railway deploys, test:

```bash
curl https://your-railway-domain.up.railway.app/health
```

Expected response:

```json
{"status":"ok"}
```

## 3. Frontend on Vercel

Create a Vercel project from the same GitHub repository.

Settings:

- Framework Preset: Next.js
- Root Directory: `vedteix-frontend`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: leave default

Required Vercel variables:

```env
BACKEND_URL=https://your-railway-domain.up.railway.app
NEXT_PUBLIC_BACKEND_URL=https://your-railway-domain.up.railway.app
NEXT_PUBLIC_SESSION_COOKIE_NAME=vedteix.sid
```

Sanity variables, if Studio/content is used:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-22
```

Deploy Vercel after the Railway URL is known. When Vercel gives you the final production domain, go back to Railway and set:

```env
FRONTEND_URL=https://your-final-vercel-domain.vercel.app
```

Then redeploy Railway so CORS and redirects use the final frontend URL.

## 4. Custom Domain and Google OAuth

Password login works through the frontend API proxy on Vercel.

Google OAuth is more sensitive because the OAuth callback hits the backend directly. For reliable Google OAuth in production, use a shared parent domain:

- Frontend: `https://app.yourdomain.com`
- Backend: `https://api.yourdomain.com`
- Railway `FRONTEND_URL=https://app.yourdomain.com`
- Railway `BACKEND_PUBLIC_URL=https://api.yourdomain.com`
- Railway `GOOGLE_CALLBACK_URL=https://api.yourdomain.com/auth/google/callback`
- Railway `SESSION_COOKIE_DOMAIN=.yourdomain.com`
- Vercel `BACKEND_URL=https://api.yourdomain.com`
- Vercel `NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com`

Also add this authorized redirect URI in Google Cloud Console:

```text
https://api.yourdomain.com/auth/google/callback
```

If you use only the default `vercel.app` and `railway.app` domains, Google OAuth can set the session cookie on the Railway domain instead of the Vercel domain. Use email/password login, or move both apps onto subdomains of the same custom domain.

## 5. Production Verification

Backend:

- `GET /health` returns `{"status":"ok"}`.
- Railway logs show `MongoDB connected`.
- No missing `MONGODB_URI` or `SESSION_SECRET` errors.
- Upload routes work after Cloudinary variables are set.

Frontend:

- Vercel build passes.
- Homepage loads without API connection errors.
- Contact form reaches the backend.
- Admin login works.
- Dashboard/admin routes redirect to `/login` when logged out.

Security:

- Rotate any credential that was ever pasted into a committed file or shared chat/log.
- Keep real values only in Vercel/Railway environment variables.
- Never place real secrets in `.env.example`, README files, or screenshots.
- Use different MongoDB/admin/email credentials for production and local development.

## 6. Troubleshooting

`Origin not allowed by CORS`

- Check Railway `FRONTEND_URL`.
- It must exactly match the Vercel origin, including `https://` and no trailing slash.
- Multiple origins can be comma-separated.

`Unauthorized` from frontend API routes

- Confirm `SESSION_COOKIE_NAME` on Railway matches `NEXT_PUBLIC_SESSION_COOKIE_NAME` on Vercel.
- Redeploy both services after changing cookie/session variables.

Uploads fail

- Set all required Cloudinary variables on Railway.
- Confirm Cloudinary credentials are active.

Google login redirects but user is not logged in

- Use shared custom subdomains and set `SESSION_COOKIE_DOMAIN=.yourdomain.com`.
- Confirm Google Cloud Console callback URL matches Railway `GOOGLE_CALLBACK_URL`.

Vercel cannot reach backend

- Confirm `BACKEND_URL` and `NEXT_PUBLIC_BACKEND_URL` point to the public Railway URL.
- Confirm Railway service is awake and `/health` returns ok.
