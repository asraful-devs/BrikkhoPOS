# BrikkhoPOS Client

Modern, responsive frontend application for BrikkhoPOS - A comprehensive Point of Sale and Worker Management System.

## 🚀 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit with RTK Query
- **Routing**: React Router DOM v7
- **Form Management**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Date Handling**: date-fns, React Day Picker
- **HTTP Client**: Axios
- **Notifications**: Sonner

## ✨ Features

- **Authentication System**: Secure login/register with role-based access control
- **Dashboard**: Separate dashboards for Admin and User roles
- **Worker Management**: Complete CRUD operations for worker profiles
- **Attendance Tracking**: Real-time attendance management with date tracking
- **Salary Management**:
    - Weekly salary summaries
    - Salary adjustments (bonus, overtime, deduction, advance)
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Mode**: Theme toggle with persistent preferences
- **Protected Routes**: Authentication guards and role-based authorization
- **Real-time Updates**: Optimistic UI updates with RTK Query

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── common/        # Shared components (forms, buttons, etc.)
│   └── ui/            # Radix UI component wrappers
├── config/            # App configuration
├── constant/          # Constants and enums
├── hooks/             # Custom React hooks
├── layout/            # Layout components
├── lib/               # Third-party library configurations
├── modules/           # Feature-based modules
│   ├── auth/         # Authentication module
│   └── dashboard/    # Dashboard module
├── page/              # Page components
├── provider/          # Context providers
├── redux/             # Redux store and slices
│   └── features/     # Feature-based Redux slices
├── routers/           # Routing configuration
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── zod/               # Zod validation schemas
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 User Roles

- **ADMIN**: Full access to all features including worker management, salary adjustments
- **USER**: Limited access to specific features based on permissions

## 🎨 UI Components

The application uses a custom component library built on top of:

- **shadcn/ui** patterns
- **Radix UI** primitives for accessibility
- **Tailwind CSS** for styling
- **CVA** (Class Variance Authority) for component variants

## 🔄 State Management

- **Redux Toolkit** for global state
- **RTK Query** for API calls and caching
- **Redux Persist** (if implemented) for state persistence

## 📝 Form Validation

All forms use:

- **React Hook Form** for form state management
- **Zod** schemas for validation
- **@hookform/resolvers** for integration

## 🌐 API Integration

API calls are handled through:

- Centralized Axios instance with interceptors
- RTK Query for automatic caching and refetching
- Type-safe API endpoints

## 🚦 Routing Structure

- `/` - Dashboard redirect based on role
- `/login` - Login page
- `/register` - Registration page
- `/admin/*` - Admin dashboard and features
- `/user/*` - User dashboard and features
- `/unauthorized` - Unauthorized access page

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Collapsible sidebar for mobile
- Touch-friendly UI elements

## 🎯 Best Practices

- **Component Structure**: Functional components with hooks
- **Type Safety**: Comprehensive TypeScript types
- **Code Splitting**: Route-based code splitting
- **Error Handling**: Centralized error handling
- **Loading States**: Skeleton loaders and loading indicators
- **Accessibility**: ARIA labels and keyboard navigation

## 👥 Authors

Md Asraful

## 🔗 Related

- [Server Repository](../BrikkhoPOS%20Server%20Site)
- [API Documentation](../BrikkhoPOS%20Server%20Site/README.md)
