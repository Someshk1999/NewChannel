# SpiritualDaily - Deployment Guide

## Project Overview
- **Frontend**: React + TypeScript (port 3000 locally)
- **Backend**: Node.js + Express (port 5001 locally)
- **Database**: MongoDB

---

## Step 1: Domain Registration

### Register at Namecheap/GoDaddy (Recommended)
1. Go to https://www.namecheap.com or https://www.godaddy.com
2. Search for domain:
   - `spiritualdaily.com` (or `.in`, `.news`, `.faith`, `.church`)
   - Approx: $8-15/year
3. Complete purchase and note the domain name

### Domain Registrar Alternatives
- Hostinger: https://www.hostinger.com
- Bluehost: https://www.bluehost.com

---

## Step 2: Frontend Deployment (Vercel)

### 2.1 Prepare Frontend for Production

Update `frontend/package.json` - change homepage URL:
```json
{
  "homepage": "https://spiritualdaily.com",
  "build": "react-scripts build"
}
```

Update API base URL in `frontend/src/App.tsx`:
```typescript
// Change from localhost:5001 to your Railway backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.spiritualdaily.com';
```

### 2.2 Deploy to Vercel

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin NewsChannel_new
   ```

2. **Go to Vercel:**
   - Visit https://vercel.com/signup
   - Sign up with GitHub
   - Click "Import Project"
   - Select your News Channel repository

3. **Configure Vercel:**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Environment Variables:
     ```
     REACT_APP_API_URL=https://api.spiritualdaily.com
     ```

4. **Deploy:** Click "Deploy" and wait for completion

5. **Get Vercel Domain:**
   - Your app will get a URL like `spiritualdaily.vercel.app`
   - Or configure custom domain (see Step 5)

---

## Step 3: Backend Deployment (Railway)

### 3.1 Prepare Backend for Production

Update `backend/server.js` to match your deployment:
```javascript
const PORT = process.env.PORT || 5001;
```

Update `backend/.env` for production:
```
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/news-channel
ADMIN_USER=admin
ADMIN_PASS=password123
JWT_SECRET=your-strong-secret-key-change-this
```

### 3.2 Deploy to Railway

1. **Create Railway Account:**
   - Visit https://railway.app/
   - Sign up with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize and select your News Channel repo

3. **Configure Railway:**
   - Select `backend` directory as root
   - Railway auto-detects Node.js
   - Add Environment Variables:
     ```
     MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/news-channel
     JWT_SECRET=your-secure-key-here
     ADMIN_USER=admin
     ADMIN_PASS=password123
     PORT=5001
     ```

4. **Deploy:**
   - Railway auto-deploys on push
   - Get your Railway URL: `https://*.railway.app`
   - This becomes your backend API URL

---

## Step 4: Database Setup (MongoDB Atlas)

### 4.1 Create MongoDB Cluster

1. **Go to MongoDB Atlas:**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up (free tier available)

2. **Create Cluster:**
   - Click "Create Deployment"
   - Choose "Free" tier
   - Select region closest to you
   - Create cluster (takes ~10 mins)

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Set Username: `admin`
   - Set Password: `strong_password_here`
   - Grant "Atlas admin" role

4. **Whitelist IP:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String:**
   - Click "Connect" on your cluster
   - Select "Drivers"
   - Copy connection string: 
     ```
     mongodb+srv://admin:password@cluster.mongodb.net/news-channel
     ```
   - Replace `password` with your actual password
   - Use this as `MONGODB_URI` in Railway

---

## Step 5: Connect Domain to Services

### 5.1 Connect Domain to Vercel (Frontend)

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains"
   - Enter `spiritualdaily.com`

2. **Configure in Namecheap/GoDaddy:**
   - Go to your domain settings
   - Find "Nameservers"
   - Change to Vercel nameservers (Vercel provides these)
   - Wait 24-48 hours for propagation

### 5.2 Setup Backend API Subdomain

1. **Add Subdomain in Vercel:**
   - Add `api.spiritualdaily.com` pointing to Railway

   OR

   **Option 2:** Use Railway custom domain
   - Railway: Settings → Domains → Add custom domain
   - Enter: `api.spiritualdaily.com`
   - Update DNS in Namecheap with Railway CNAME record

### 5.3 Update Frontend API URL

In `frontend/src/App.tsx`:
```typescript
const API_BASE_URL = 'https://api.spiritualdaily.com';
```

Deploy changes to Vercel.

---

## Step 6: Final Configuration & Testing

### 6.1 Test Backend

```bash
# Test API health
curl https://api.spiritualdaily.com/health

# Test login
curl -X POST https://api.spiritualdaily.com/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"password123"}'

# Test news fetch
curl https://api.spiritualdaily.com/news
```

### 6.2 Test Frontend

- Visit: `https://spiritualdaily.com`
- Login with admin credentials
- Try adding/editing news articles
- Check browser console for errors

### 6.3 Monitor Deployments

- **Vercel:** https://vercel.com/dashboard
- **Railway:** https://railway.app/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com/

---

## Step 7: Security Checklist

- [ ] Change JWT_SECRET to a strong random key
- [ ] Change admin password to something secure
- [ ] Enable HTTPS (automatic on Vercel/Railway)
- [ ] Set MongoDB IP whitelist (or restrict to services only)
- [ ] Use environment variables for all secrets
- [ ] Don't commit `.env` files to GitHub
- [ ] Add `.env` to `.gitignore`

---

## Troubleshooting

### Issue: "Cannot connect to API"
- Check Railway backend logs
- Verify MONGODB_URI is correct
- Check that IP is whitelisted in MongoDB Atlas

### Issue: "CORS error"
- Update `backend/server.js` to add your domain:
  ```javascript
  app.use(cors({
    origin: 'https://spiritualdaily.com',
    credentials: true
  }));
  ```

### Issue: "MongoDB connection timeout"
- Verify username/password in connection string
- Check MongoDB Atlas IP whitelist
- Ensure database name in URI is correct

### Issue: "Domain not resolving"
- Wait 24-48 hours for DNS propagation
- Use https://dnschecker.org to verify

---

## Cost Estimate (Monthly)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel | Yes (generous) | $0-20 |
| Railway | 5GB/month free | $0-10 |
| MongoDB Atlas | 512MB free | $0-15 |
| Domain | - | ~$1/month |
| **Total** | **~$5-7/month** | **or free** |

---

## Next Steps

1. Register domain: `spiritualdaily.com`
2. Create Vercel account and deploy frontend
3. Create Railway account and deploy backend
4. Create MongoDB Atlas cluster
5. Connect domain to services
6. Test all features
7. Go live!

Questions? Check the logs in Vercel and Railway dashboards.
