# Deployment Guide for Homewise

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Next.js and configure the project
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link your project

## Environment Variables

Currently, no environment variables are required for the MVP. If you add API keys or other secrets later, add them in the Vercel dashboard under Project Settings > Environment Variables.

## Build Configuration

The project is configured with:
- Framework: Next.js 14
- Build Command: `npm run build`
- Output Directory: `.next` (default)
- Install Command: `npm install`

All configuration is in `vercel.json` and `next.config.js`.

## Post-Deployment

After deployment, your app will be available at:
- Production: `https://your-project.vercel.app`
- Preview: Each push creates a preview deployment

## Troubleshooting

If you encounter build errors:
1. Check Node.js version (should be 18+)
2. Ensure all dependencies are in `package.json`
3. Check build logs in Vercel dashboard



