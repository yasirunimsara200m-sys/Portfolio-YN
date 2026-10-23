# Yasiru Nimsara - Professional Full-Stack Portfolio & Admin CMS

A high-performance portfolio website with a full-featured Admin CMS, built for **T. K. Yasiru Nimsara** (Full Stack Software Engineer).

---

## 🛠️ Tech Stack & Cloud Infrastructure

- **Frontend & Admin UI:** Next.js 14 (App Router) + Tailwind CSS + Lucide React
- **Backend API:** NestJS 10 + Prisma ORM + JWT Auth + Passport + Bcrypt
- **Cloud Database:** Neon.tech Serverless PostgreSQL (`ep-fancy-unit-b5b763h4.c-7.us-east-2.aws.neon.tech`)
- **Theme:** Dual Mode (Default Light Mode + Dark Mode with Sun/Moon Switcher)
- **Interactive FX:** Custom Magnetic Cursor Glow + Dynamic Particle Canvas + Auto-Scroll Tech Ticker

---

## 💫 2 Unique Loading Experiences

1. **Preloader 1 (Custom YN Luxury Logo & Cyber Progress Bar):**
   - Features the custom transparent YN logo with ambient backlight glow.
   - Real-time animated cyber progress bar (0% -> 100%) with system boot status lines.
   - Automatically plays on the homepage (`/`) and fades into the portfolio.

2. **Preloader 2 (Holographic Radar Terminal):**
   - Active on Next.js route transitions (`loading.tsx`).
   - Holographic spinning radar ring with linear cyber loader.

> 💡 **Preview & Test Both:** Visit [http://localhost:3000/loading-preview](http://localhost:3000/loading-preview) to switch between and replay both loading screens!

---

## 🔐 Admin Portal Credentials

- **Admin Login:** `http://localhost:3000/admin/login`
- **Dashboard:** `http://localhost:3000/admin`
- **Email:** `yasiru01nimsara@gmail.com`
- **Password:** `Admin@Yasiru2026`

---

## 🚀 Deployment Guide (Vercel + Cloud Database)

### 1. Push Code to GitHub
```bash
git add .
git commit -m "feat: complete portfolio with dual preloader, neon postgresql, and vercel deployment config"
git branch -M main
git push -u origin main
```
*Repository:* `https://github.com/yasirunimsara200m-sys/Portfolio-YN.git`

### 2. Deploy Frontend on Vercel
1. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
2. Select your repository: `Portfolio-YN`.
3. In **Root Directory**, choose `frontend` (or keep root with included `vercel.json`).
4. In **Environment Variables**, add:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com/api
   ```
   *(Or leave empty if testing with local/mock data)*
5. Click **"Deploy"**!

### 3. Deploy Backend on Render / Railway (Free)
1. Go to [Render.com](https://render.com) -> **New Web Service** -> Connect `Portfolio-YN`.
2. Configure settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm run start:prod`
3. Add Environment Variables:
   - `DATABASE_URL`: `postgresql://neondb_owner:npg_QzwiSus2p1EU@ep-fancy-unit-b5b763h4.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require`
   - `JWT_SECRET`: `portfolio_super_secure_jwt_secret_key_2026_yasiru`
   - `ADMIN_EMAIL`: `yasiru01nimsara@gmail.com`
   - `ADMIN_PASSWORD`: `Admin@Yasiru2026`
   - `CORS_ORIGIN`: `https://your-vercel-domain.vercel.app`
4. Click **Deploy Web Service**!
