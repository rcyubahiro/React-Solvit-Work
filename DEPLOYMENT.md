# Deployment Guide for Recipe API Integration

This guide covers deploying your Recipe API Integration application to various platforms.

## Prerequisites

- GitHub account
- Node.js v18+ installed locally
- Project built successfully locally (`npm run build`)

## Option 1: Deploy to Vercel (Recommended)

Vercel offers the easiest deployment for Vite + React applications.

### Steps:

1. **Push your code to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Recipe API Integration"
   git branch -M main
   git remote add origin https://github.com/shemajolivetgislain/redux_tool_kit_course.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"
   - Your app will be live at `https://your-project-name.vercel.app`

### Using Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel
```

## Option 2: Deploy to Netlify

### Steps:

1. **Build your project**

   ```bash
   npm run build
   ```

2. **Deploy via Netlify UI**
   - Visit [netlify.com](https://netlify.com)
   - Sign up/Login
   - Click "Add new site" → "Deploy manually"
   - Drag and drop your `dist` folder
   - Your site will be live at `https://random-name.netlify.app`

### Using Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### netlify.toml Configuration:

Create a `netlify.toml` file in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Option 3: Deploy to GitHub Pages

### Steps:

1. **Install gh-pages**

   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.ts**

   ```typescript
   export default defineConfig({
     base: "/redux_tool_kit_course/",
     // ... rest of config
   });
   ```

3. **Update package.json**

   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**

   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages"
   - Select "gh-pages" branch as source
   - Your site will be live at `https://shemajolivetgislain.github.io/redux_tool_kit_course/`

## Option 4: Deploy to Render

### Steps:

1. **Push code to GitHub**

2. **Deploy via Render**
   - Visit [render.com](https://render.com)
   - Sign up/Login with GitHub
   - Click "New" → "Static Site"
   - Connect your repository
   - Configure:
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
   - Click "Create Static Site"
   - Your app will be live at `https://your-app-name.onrender.com`

## Post-Deployment

### Update README with Live Link

After deploying, update your README.md:

```markdown
## 🔗 Live Demo

🌐 [View Live Application](https://your-deployed-url.com)
```

### Test Your Deployment

1. Visit your deployed URL
2. Test the following features:
   - Browse recipes on landing page
   - Search and sort functionality
   - Pagination
   - Login with demo credentials
   - Create, edit, delete recipes (dashboard)
   - Recipe detail view

### Common Issues

#### Issue: Routes return 404

**Solution**: Configure your hosting platform for SPA routing

- Vercel: Automatically handled
- Netlify: Add `netlify.toml` with redirects
- GitHub Pages: Add `404.html` that redirects to `index.html`

#### Issue: Environment variables not working

**Solution**:

- Vite requires `VITE_` prefix for environment variables
- This project doesn't need environment variables (API URL is hardcoded)

#### Issue: Build fails

**Solution**:

- Ensure Node.js version is v18+
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run build`

## Performance Optimization

### Before Deploying:

1. **Optimize images**
   - Use WebP format
   - Compress images
   - Use CDN for large assets

2. **Enable compression**
   - Most platforms enable this by default
   - Gzip/Brotli compression for assets

3. **Configure caching**
   - Static assets cached for 1 year
   - HTML files cached for shorter periods

### Monitoring

After deployment, monitor:

- Page load time
- API response times
- Error rates
- User engagement

Use tools like:

- Google Analytics
- Vercel Analytics
- Lighthouse for performance audits

## Continuous Deployment

### Setup Auto-Deploy:

Most platforms support automatic deployment on git push:

1. **Vercel**: Automatically deploys on push to main branch
2. **Netlify**: Automatically deploys on push to main branch
3. **Render**: Configure auto-deploy in settings

### Branch Deployments:

- **Production**: `main` branch
- **Staging**: `develop` branch (configure separate deployment)
- **Preview**: Pull request deployments (Vercel/Netlify support this)

## Security Considerations

1. **API Keys**: This project doesn't use API keys (demo API)
2. **HTTPS**: All recommended platforms provide free SSL
3. **CORS**: DummyJSON API allows all origins
4. **Authentication**: JWT tokens stored in localStorage (demo purposes)

## Conclusion

Choose the deployment platform based on your needs:

- **Vercel**: Best for automatic deployments, excellent DX
- **Netlify**: Great for static sites, good free tier
- **GitHub Pages**: Free, simple, good for portfolios
- **Render**: Good all-around option with free tier

All options are suitable for this portfolio project. Vercel is recommended for the best developer experience.
