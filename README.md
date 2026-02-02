# 🌳 BrikkhoPOS

> A comprehensive Point of Sale and Worker Management System designed for efficient business operations, attendance tracking, and salary management.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

## 📋 Overview

BrikkhoPOS is a modern, full-stack application built to streamline worker management, attendance tracking, and payroll operations. The system features a powerful React frontend with Redux state management and a robust Node.js backend powered by Express and Prisma ORM.

### 🎯 Key Features

- **👤 User Management**: Multi-role authentication system (Admin/User) with secure JWT-based authentication
- **👷 Worker Management**: Complete CRUD operations for worker profiles with detailed information tracking
- **📅 Attendance System**: Real-time attendance tracking with daily logs and work hour recording
- **💰 Salary Management**: Automated weekly salary calculations with support for adjustments (bonuses, overtime, deductions, advances)
- **📊 Dashboard**: Role-based dashboards with comprehensive analytics and insights
- **🎨 Modern UI**: Responsive design with dark mode support and smooth animations
- **🔐 Security**: Industry-standard security with bcrypt password hashing and HTTP-only cookies

## 🏗️ Architecture

```
BrikkhoPOS/
├── BrikkhoPOS Client Site/    # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── modules/           # Feature modules
│   │   ├── redux/             # State management
│   │   ├── routers/           # Application routing
│   │   └── types/             # TypeScript definitions
│   └── package.json
│
├── BrikkhoPOS Server Site/    # Node.js + Express Backend
│   ├── src/
│   │   ├── app/
│   │   │   ├── modules/       # API modules
│   │   │   ├── middlewares/   # Express middlewares
│   │   │   └── routes/        # API routes
│   │   └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # Database migrations
│   └── package.json
│
└── README.md                   # This file
```

## 🚀 Technology Stack

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **HTTP Client**: Axios

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **Development**: tsx

```

## 📚 Documentation

- **[Client Documentation](./BrikkhoPOS%20Client%20Site/README.md)** - Frontend setup and features
- **[Server Documentation](./BrikkhoPOS%20Server%20Site/README.md)** - Backend API and database

## 🎨 Features in Detail

### Worker Management

- Add, edit, and manage worker profiles
- Track worker details (name, salary, contact, address)
- Upload profile pictures
- Soft delete functionality
- Status management (Active/Inactive)

### Attendance Tracking

- Daily attendance marking
- Work hours recording
- Attendance notes and comments
- Historical attendance reports
- Unique constraint per worker per day

### Salary System

- Automatic weekly salary calculation
- Payment tracking and history
- Flexible salary adjustments:
    - Bonuses
    - Overtime pay
    - Deductions
    - Advance payments
- Detailed salary reports

### User Roles

- **Admin**: Full system access including worker management and salary adjustments
- **User**: Limited access for basic operations

## 🔐 Security Features

- JWT-based authentication
- HTTP-only cookies for token storage
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API routes
- CORS configuration
- Input validation and sanitization

## 📱 Responsive Design

- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface
- Collapsible navigation
- Progressive Web App (PWA) ready


## 📄 License

Md Asraful



## 📞 Support

For support, asraful.devs@gmail.com or open an issue in this repository.


---

<div align="center">
  <strong>Built with ❤️ by the BrikkhoPOS Team</strong>
</div>
```
