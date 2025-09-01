# Gold Jewellery Dashboard

A comprehensive React application for managing gold jewellery inventory and sales with Redux Toolkit and RTK Query.

## Features

- **Landing Page**: Beautiful glassy design with animated backgrounds and modern UI
- **Authentication**: Login and registration with glass morphism effects
- **Dashboard**: Comprehensive dashboard with statistics and quick actions
- **Shop Management**: Full CRUD operations for managing jewellery shops
- **User Management**: Complete user management with role-based assignments
- **Form Validation**: Yup schema validation with React Hook Form
- **Redux Toolkit**: State management with RTK Query and local slices
- **Protected Routes**: Secure access to dashboard functionality
- **Modern UI**: Built with Tailwind CSS and glass morphism for a stunning design

## Tech Stack

- React 19
- Redux Toolkit
- RTK Query
- React Router DOM
- Tailwind CSS
- Vite

## API Configuration

The application is configured to connect to:
- **Base URL**: `http://localhost:9000/api/v1`
- **Authentication Endpoints**:
  - `POST /auth/login` - User login
  - `POST /auth/register` - User registration
  - `GET /auth/profile` - Get user profile
- **Shop Management Endpoints**:
  - `GET /shops` - Get all shops
  - `GET /shops/:id` - Get specific shop
  - `POST /shops` - Create new shop
  - `PUT /shops/:id` - Update shop
  - `DELETE /shops/:id` - Delete shop
- **User Management Endpoints**:
  - `GET /users` - Get all users
  - `GET /users/:id` - Get specific user
  - `POST /users` - Create new user
  - `PUT /users/:id` - Update user
  - `DELETE /users/:id` - Delete user

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
├── pages/
│   ├── Home/
│   │   └── HomePage.jsx
│   ├── Dashboard/
│   │   └── DashboardPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── ShopManagementPage.jsx
│   └── UserManagementPage.jsx
├── store/
│   ├── store.js
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── shopSlice.js
│   │   └── userSlice.js
│   └── api/
│       ├── apiSlice.js
│       ├── authApi.js
│       ├── shopApi.js
│       └── userApi.js
├── utils/
│   └── validationSchemas.js
├── App.jsx
├── main.jsx
└── index.css
```

## Authentication Flow

1. **Home Page**: Shows login/register buttons for non-authenticated users, user menu for authenticated users
2. **Login/Register**: Only accessible to non-authenticated users (redirects to dashboard if already logged in)
3. **Dashboard & Management**: Protected routes requiring authentication
4. **User Menu**: Dropdown with navigation to dashboard, shop management, user management, and logout
5. **Automatic Redirects**: Seamless navigation based on authentication status

## Management Features

### Shop Management
- **Create**: Add new jewellery shops with complete details
- **Read**: View all shops in a responsive table format
- **Update**: Edit shop information including contact details and status
- **Delete**: Remove shops with confirmation dialogs
- **Validation**: Form validation using Yup schemas

### User Management
- **Create**: Add new users with role assignments and shop assignments
- **Read**: View all users with role badges and shop information
- **Update**: Edit user details including role and status changes
- **Delete**: Remove users with confirmation dialogs
- **Role-based**: Support for admin, manager, and staff roles
- **Shop Assignment**: Users can be assigned to specific shops

## State Management

The application uses Redux Toolkit with both RTK Query and local slices:

### RTK Query (API State)
- **Authentication API**: Login, register, and profile management
- **Shop API**: Full CRUD operations for shop management
- **User API**: Complete user management with role assignments
- **Automatic Caching**: Smart caching and invalidation strategies

### Local Slices (UI State)
- **Auth Slice**: User authentication state and token management
- **Shop Slice**: Local shop state, filters, sorting, and view preferences
- **User Slice**: Local user state, filters, sorting, and view preferences

## API Integration

The application uses RTK Query for API calls with automatic token management:
- Authentication tokens are automatically included in API requests
- Failed requests are handled gracefully with error messages
- Loading states are managed automatically
- Optimistic updates for better user experience

## UI/UX Design

### Glass Morphism Design
- **Animated Backgrounds**: Dynamic gradient animations with floating blobs
- **Glass Effects**: Backdrop blur and transparency for modern aesthetics
- **Smooth Transitions**: Fluid animations and hover effects
- **Responsive Design**: Optimized for all device sizes

### Color Scheme
- **Primary**: Gold/Yellow gradient theme appropriate for jewellery
- **Secondary**: Orange and red accents for visual hierarchy
- **Glass Effects**: White transparency with backdrop blur
- **Accessibility**: High contrast text and focus indicators
