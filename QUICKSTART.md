# Quick Start Guide

Get your Recipe API Integration project up and running in minutes!

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- Git

## Installation (5 minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/shemajolivetgislain/redux_tool_kit_course.git
cd redux_tool_kit_course
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Open in Browser

Visit: http://localhost:5173

## Usage

### Browse Recipes (No Login Required)

1. Visit the homepage
2. Browse recipes in the grid
3. Use search bar to find specific recipes
4. Sort by name, rating, time, or calories
5. Click "View Recipe" for full details

### Login to Dashboard

1. Click "Go to Dashboard" or "Login" button
2. Use demo credentials:
   - **Username**: `emilys`
   - **Password**: `emilyspass`
3. Click "Login"

### Manage Recipes (Logged In)

1. **Create**: Click "Create New Recipe"
   - Fill in recipe details
   - Add ingredients one by one
   - Add instruction steps
   - Add tags
   - Click "Create Recipe"

2. **Edit**: Click "Edit" button on any recipe card
   - Update recipe information
   - Modify ingredients/instructions
   - Click "Update Recipe"

3. **Delete**: Click "Delete" button
   - Confirm deletion

4. **View**: Click "View Recipe" for full details

## Project Structure

```
src/
├── app/
│   ├── api/          # RTK Query API services
│   ├── features/     # Redux slices
│   └── store/        # Redux store
├── components/       # Reusable components
├── pages/           # Page components
└── types/           # TypeScript types
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Features Overview

### ✨ Landing Page

- Hero section with gradient
- Recipe browsing
- Search & sort
- Pagination

### 🔐 Authentication

- JWT-based login
- Protected routes
- User profile display

### 📊 Dashboard

- Full CRUD operations
- Recipe management
- User-friendly forms

### 📖 Recipe Details

- Full recipe information
- Ingredients & instructions
- Nutritional info
- Ratings & reviews

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 6
- **API**: DummyJSON (demo)

## API Endpoints

### Recipes

- GET `/recipes` - List all recipes
- GET `/recipes/:id` - Get single recipe
- GET `/recipes/search?q=` - Search recipes
- POST `/recipes/add` - Create recipe
- PUT `/recipes/:id` - Update recipe
- DELETE `/recipes/:id` - Delete recipe

### Authentication

- POST `/auth/login` - Login
- GET `/auth/me` - Get current user

## Demo Users

```
Username: emilys    | Password: emilyspass
Username: michaelw  | Password: michaelwpass
Username: sophiab   | Password: sophiabpass
```

## Troubleshooting

### Port 5173 already in use?

```bash
# Change port in vite.config.ts or kill the process
npx kill-port 5173
```

### Module not found errors?

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build fails?

```bash
# Check Node version
node --version  # Should be v18+

# Clear cache
npm run build -- --force
```

## Development Tips

1. **Hot Reload**: Code changes auto-refresh the browser
2. **Redux DevTools**: Install browser extension for debugging
3. **TypeScript**: Hover over variables to see types
4. **Path Aliases**: Use `@/` instead of relative imports

## Next Steps

1. ✅ Explore the application
2. ✅ Test all features
3. ✅ Customize the design
4. ✅ Deploy to Vercel/Netlify
5. ✅ Add to your portfolio

## Need Help?

- 📖 Check [README.md](README.md) for detailed documentation
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guides
- ✅ Use [CHECKLIST.md](CHECKLIST.md) before deploying
- 📝 Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for overview

## Resources

- [React Docs](https://react.dev/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [RTK Query Tutorial](https://redux-toolkit.js.org/tutorials/rtk-query)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Happy Coding! 🎉**

Built with ❤️ using React, Redux Toolkit, and TypeScript
