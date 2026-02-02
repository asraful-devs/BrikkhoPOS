# BrikkhoPOS Server

RESTful API backend for BrikkhoPOS - A comprehensive Worker Management and Point of Sale System.

## 🚀 Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Development**: tsx (TypeScript executor)

## ✨ Features

- **Authentication & Authorization**
    - JWT-based authentication
    - Role-based access control (ADMIN, USER)
    - Secure password hashing with bcrypt
    - Cookie-based token management

- **User Management**
    - User registration and login
    - Profile management
    - Active/Inactive status control

- **Worker Management**
    - Complete CRUD operations
    - Worker profiles with detailed information
    - Soft delete functionality
    - Status management (Active/Inactive)

- **Attendance System**
    - Daily attendance tracking
    - Work hours recording
    - Attendance notes
    - Unique constraint per worker per day

- **Salary Management**
    - Weekly salary summaries
    - Automatic salary calculations
    - Payment tracking
    - Salary adjustments (Bonus, Overtime, Deduction, Advance)

- **API Features**
    - RESTful API design
    - Error handling middleware
    - CORS support
    - Request validation
    - Type-safe responses

## 📁 Project Structure

```
src/
├── app/
│   ├── config/        # Configuration files
│   ├── error/         # Error handling utilities
│   ├── helper/        # Helper functions
│   ├── middlewares/   # Express middlewares
│   ├── modules/       # Feature modules
│   │   ├── auth/     # Authentication module
│   │   ├── user/     # User management
│   │   ├── worker/   # Worker management
│   │   ├── attendance/ # Attendance tracking
│   │   └── salary/   # Salary management
│   ├── routes/        # API routes
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── app.ts             # Express app configuration
└── server.ts          # Server entry point

prisma/
├── schema.prisma      # Database schema
├── migrations/        # Database migrations
└── schema/           # Schema partials
```

## 🗄️ Database Schema

### Enums

- **Role**: USER, ADMIN
- **ActiveStatus**: ACTIVE, INACTIVE
- **AdjustmentType**: BONUS, OVERTIME, DEDUCTION, ADVANCE

### Models

- **User**: System users with authentication
- **Worker**: Worker profiles and information
- **Attendance**: Daily attendance records
- **WeeklySummary**: Weekly salary summaries
- **SalaryAdjustment**: Salary modifications and adjustments

## 🔌 API Endpoints

### Authentication

```
POST   /api/v1/auth/register    - Register new user
POST   /api/v1/auth/login       - User login
POST   /api/v1/auth/logout      - User logout
GET    /api/v1/auth/me          - Get current user
```

### Users

```
GET    /api/v1/users            - Get all users (Admin)
GET    /api/v1/users/:id        - Get user by ID
PATCH  /api/v1/users/:id        - Update user
DELETE /api/v1/users/:id        - Delete user (Admin)
```

### Workers

```
GET    /api/v1/workers          - Get all workers
GET    /api/v1/workers/:id      - Get worker by ID
POST   /api/v1/workers          - Create new worker (Admin)
PATCH  /api/v1/workers/:id      - Update worker (Admin)
DELETE /api/v1/workers/:id      - Soft delete worker (Admin)
```

### Attendance

```
GET    /api/v1/attendance              - Get all attendance records
GET    /api/v1/attendance/:id          - Get attendance by ID
POST   /api/v1/attendance              - Mark attendance
PATCH  /api/v1/attendance/:id          - Update attendance
DELETE /api/v1/attendance/:id          - Delete attendance
GET    /api/v1/attendance/worker/:id   - Get worker attendance history
```

### Weekly Summary

```
GET    /api/v1/weekly-summary          - Get all summaries
GET    /api/v1/weekly-summary/:id      - Get summary by ID
POST   /api/v1/weekly-summary          - Generate weekly summary
PATCH  /api/v1/weekly-summary/:id      - Update summary
GET    /api/v1/weekly-summary/worker/:id - Get worker summaries
```

### Salary Adjustments

```
GET    /api/v1/salary-adjustment       - Get all adjustments
GET    /api/v1/salary-adjustment/:id   - Get adjustment by ID
POST   /api/v1/salary-adjustment       - Create adjustment (Admin)
PATCH  /api/v1/salary-adjustment/:id   - Update adjustment (Admin)
DELETE /api/v1/salary-adjustment/:id   - Delete adjustment (Admin)
```

## 🔐 Authentication

The API uses JWT tokens for authentication:

1. **Login**: Receive JWT token in HTTP-only cookie
2. **Protected Routes**: Send cookie with requests
3. **Authorization**: Role-based access control (RBAC)

### Middleware

- `authenticate` - Verify JWT token
- `authorize(['ADMIN'])` - Check user role

## ✅ Request Validation

All requests are validated using Zod schemas:

- Input validation
- Type safety
- Automatic error responses

## 🛡️ Error Handling

Centralized error handling:

- Custom error classes
- Global error middleware
- Consistent error responses
- Development vs Production error details

## 🎯 Best Practices

- **Type Safety**: Full TypeScript coverage
- **Validation**: Zod schemas for all inputs
- **Error Handling**: Centralized error management
- **Security**:
    - Password hashing
    - JWT authentication
    - CORS configuration
    - HTTP-only cookies
- **Database**:
    - Prisma migrations
    - Soft deletes
    - Unique constraints
    - Cascading deletes
- **Code Organization**:
    - Modular structure
    - Separation of concerns
    - DRY principles

## 📈 Performance

- Database connection pooling with Prisma
- Indexed queries for faster lookups
- Efficient query patterns
- Pagination support for large datasets

## 👥 Authors

Md Asraful

## 🔗 Related

- [Client Repository](../BrikkhoPOS%20Client%20Site)
- [Main Documentation](../README.md)

## 📞 Support

For issues and questions, please open an issue in the repository.
