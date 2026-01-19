# Recipe API Integration - Redux Toolkit Query

A comprehensive recipe management application built with React, TypeScript, Redux Toolkit Query (RTK Query), and Vite. This project demonstrates modern state management, API integration, authentication, and CRUD operations.

![Recipe App](https://img.shields.io/badge/React-19.1.1-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.8.2-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-6.0.4-yellow)

## 🌟 Features

### Landing Page
- **Hero Section**: Eye-catching gradient hero with call-to-action
- **Recipe Browsing**: Browse thousands of recipes from the DummyJSON API
- **Search Functionality**: Real-time search with debouncing for better performance
- **Sorting Options**: Sort recipes by name, rating, prep time, or calories
- **Pagination**: Navigate through recipes with smooth pagination controls
- **Responsive Design**: Mobile-first, fully responsive layout

### Authentication
- **Secure Login**: JWT-based authentication using DummyJSON Auth API
- **Token Management**: Automatic token storage and header injection
- **User Profile**: Display logged-in user information with avatar
- **Protected Routes**: Dashboard access restricted to authenticated users

### Dashboard (Authenticated Users Only)
- **View All Recipes**: Browse recipes in a card-based grid layout
- **Create Recipe**: Add new recipes with comprehensive details
- **Update Recipe**: Edit existing recipe information
- **Delete Recipe**: Remove recipes with confirmation dialog
- **Search & Filter**: Filter recipes in real-time
- **User Profile Display**: Shows current user information

### Recipe Management
- **Detailed Recipe View**: Full recipe information including:
  - Ingredients list
  - Step-by-step instructions
  - Cooking time and servings
  - Nutritional information
  - Rating and reviews
  - Tags and meal types
- **Rich Form Interface**: Comprehensive recipe creation/editing form
- **Dynamic Lists**: Add/remove ingredients, instructions, and tags dynamically

## 🛠️ Technologies Used

- **React 19.1.1**: Modern UI library with latest features
- **TypeScript 5.8.3**: Type-safe development
- **Redux Toolkit 2.8.2**: State management with simplified Redux patterns
- **RTK Query**: Powerful data fetching and caching tool
- **React Router 7**: Client-side routing
- **Vite 6**: Fast build tool and development server
- **Tailwind CSS 4**: Utility-first CSS framework
- **DummyJSON API**: Mock REST API for recipes and authentication

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🚀 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shemajolivetgislain/redux_tool_kit_course.git
cd redux_tool_kit_course
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
redux_tool_kit_course/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── apiEntry.ts          # RTK Query base configuration
│   │   │   ├── auth/
│   │   │   │   └── index.ts         # Authentication API endpoints
│   │   │   └── recipe/
│   │   │       └── index.ts         # Recipe API endpoints
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   └── authSlice.ts     # Authentication state slice
│   │   │   └── expenses/
│   │   │       └── expenseSlice.ts  # Legacy expense slice
│   │   └── store/
│   │       └── index.ts             # Redux store configuration
│   ├── components/
│   │   ├── Button.tsx               # Reusable button component
│   │   ├── Input.tsx                # Reusable input component
│   │   ├── RecipeCard.tsx           # Recipe card display component
│   │   └── RecipeForm.tsx           # Recipe creation/editing form
│   ├── pages/
│   │   ├── Landing.tsx              # Landing page with recipes
│   │   ├── Login.tsx                # Login page
│   │   ├── Dashboard.tsx            # Protected dashboard
│   │   └── RecipeDetail.tsx         # Individual recipe view
│   ├── types/
│   │   ├── recipeType.ts            # Recipe-related TypeScript types
│   │   ├── inputType.ts             # Input component types
│   │   └── expenseType.ts           # Expense types
│   ├── App.tsx                      # Main app component with routing
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles
├── public/                          # Static assets
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

## 🔑 Authentication

The app uses the DummyJSON authentication API for demo purposes.

### Demo Credentials:
- **Username**: `emilys`
- **Password**: `emilyspass`

### Other Test Users:
- **Username**: `michaelw` | **Password**: `michaelwpass`
- **Username**: `sophiab` | **Password**: `sophiabpass`

## 🌐 API Endpoints

### Recipes
- `GET /recipes` - Get all recipes (with pagination, search, sorting)
- `GET /recipes/{id}` - Get single recipe
- `GET /recipes/search?q={query}` - Search recipes
- `POST /recipes/add` - Create recipe (authenticated)
- `PUT /recipes/{id}` - Update recipe (authenticated)
- `DELETE /recipes/{id}` - Delete recipe (authenticated)

### Authentication
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (requires token)
- `POST /auth/refresh` - Refresh access token

## 🎨 Key Features Implementation

### RTK Query Setup
```typescript
// Base API configuration with automatic token injection
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://dummyjson.com',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
```

### Path Aliases
The project uses `@/` path alias for cleaner imports:
```typescript
import RecipeCard from "@/components/RecipeCard";
import { useGetRecipesQuery } from "@/app/api/recipe";
```

### Pagination
```typescript
const { data } = useGetRecipesQuery({
  limit: 12,
  skip: currentPage * 12,
  q: searchQuery,
  sortBy: 'name',
  order: 'asc'
});
```

### Protected Routes
```typescript
useEffect(() => {
  if (!isAuthenticated) {
    navigate("/login");
  }
}, [isAuthenticated, navigate]);
```

## 🎯 Usage Guide

### 1. Browse Recipes (No Authentication Required)
- Visit the homepage
- Use the search bar to find specific recipes
- Sort recipes by different criteria
- Click "View Recipe" to see full details
- Navigate through pages using pagination

### 2. Login to Dashboard
- Click "Go to Dashboard" or navigate to `/login`
- Use demo credentials: `emilys` / `emilyspass`
- You'll be redirected to the dashboard

### 3. Manage Recipes (Authenticated)
- **Create**: Click "Create New Recipe" and fill in the form
- **Edit**: Click the "Edit" button on any recipe card
- **Delete**: Click the "Delete" button and confirm
- **View**: Click "View Recipe" to see full details

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel login
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from the 'dist' folder
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Vite Config
- Path aliases configured for clean imports
- React plugin with SWC for fast refresh
- Tailwind CSS integration

### TypeScript Config
- Strict mode enabled
- Path aliases mapped
- ES2022 target

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Shema Jolivet Gislain**
- GitHub: [@shemajolivetgislain](https://github.com/shemajolivetgislain)

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com) for providing the mock API
- [Redux Toolkit](https://redux-toolkit.js.org/) for excellent state management tools
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool

## 📚 Learning Resources

- [Redux Toolkit Query Tutorial](https://redux-toolkit.js.org/tutorials/rtk-query)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Note**: This is a portfolio project using a demo API. CRUD operations are simulated and may not persist permanently on the backend.

## 🔗 Live Demo

[Add your deployed link here]
