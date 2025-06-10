# CI/CD Node.js API

A production-ready RESTful API built with Node.js and Express.js, designed to demonstrate modern development practices, comprehensive testing, and CI/CD pipeline integration.

## 🚀 Features

- **Complete CRUD Operations** for user management
- **Advanced Filtering & Pagination** for scalable data retrieval
- **Input Validation & Sanitization** with detailed error responses
- **Comprehensive Testing Suite** with 22+ test cases
- **Health Monitoring** with system metrics
- **Request Logging** for debugging and monitoring
- **Graceful Shutdown** handling for production deployments
- **Environment-aware Configuration** for different deployment stages

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Real-World Use Cases](#real-world-use-cases)
- [Testing](#testing)
- [Development](#development)
- [CI/CD Integration](#cicd-integration)
- [Production Deployment](#production-deployment)
- [Contributing](#contributing)

## 🎯 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd ci-cd-node-api

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Check code quality
npm run lint
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message and API info |
| GET | `/health` | Health check with system metrics |
| GET | `/api/users` | Get all users (with filtering & pagination) |
| GET | `/api/users/:id` | Get specific user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update existing user |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/api/stats` | API statistics |

### Detailed API Reference

#### 1. Welcome Endpoint
```http
GET /
```

**Response:**
```json
{
  "message": "Welcome to the CI/CD Node API",
  "version": "1.0.0",
  "environment": "development",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "endpoints": {
    "health": "/health",
    "users": "/api/users",
    "documentation": "See README.md for full API documentation"
  }
}
```

#### 2. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "uptime": 3600,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "memory": {
    "used": "45 MB",
    "total": "128 MB"
  },
  "version": "1.0.0"
}
```

#### 3. Get Users (with Advanced Features)
```http
GET /api/users?page=1&limit=10&name=john&email=doe
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 10)
- `name` (optional): Filter by name (case-insensitive partial match)
- `email` (optional): Filter by email (case-insensitive partial match)

**Response:**
```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalUsers": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### 4. Get User by ID
```http
GET /api/users/1
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

#### 5. Create User
```http
POST /api/users
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 4,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 6. Update User
```http
PUT /api/users/1
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

#### 7. Delete User
```http
DELETE /api/users/1
```

**Response:**
```json
{
  "message": "User deleted successfully",
  "deletedUser": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 8. API Statistics
```http
GET /api/stats
```

**Response:**
```json
{
  "totalUsers": 25,
  "apiVersion": "1.0.0",
  "uptime": 7200,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error Responses

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "details": {
    "field": "Specific field error"
  }
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

## 🌍 Real-World Use Cases

This API architecture and implementation pattern is commonly used in various real-world scenarios:

### 1. **E-commerce Platforms**
- **User Management**: Customer registration, profile updates, account management
- **Product Catalogs**: With filtering, pagination, and search capabilities
- **Order Processing**: CRUD operations for orders, inventory management
- **Example**: Building a customer portal where users can manage their profiles, view order history, and update preferences

### 2. **SaaS Applications**
- **Multi-tenant User Management**: Managing users across different organizations
- **Feature Access Control**: User roles and permissions management
- **Analytics Dashboards**: APIs for fetching user engagement metrics
- **Example**: A project management tool where teams can invite members, assign roles, and track user activity

### 3. **Social Media & Content Platforms**
- **User Profiles**: Registration, authentication, profile management
- **Content Management**: Posts, comments, media uploads with pagination
- **Social Features**: Friends, followers, notifications
- **Example**: A blogging platform where authors can manage their profiles, publish articles, and interact with readers

### 4. **Enterprise Applications**
- **Employee Management Systems**: HR applications for managing staff data
- **CRM Systems**: Customer relationship management with search and filtering
- **Inventory Management**: Product tracking with advanced filtering capabilities
- **Example**: An HR portal where managers can view employee profiles, update information, and generate reports

### 5. **Mobile App Backends**
- **User Authentication**: Registration and login for mobile apps
- **Data Synchronization**: Offline-first mobile apps with server sync
- **Push Notifications**: User preference management for notifications
- **Example**: A fitness tracking app where users sync their workout data, manage preferences, and view progress

### 6. **IoT & Device Management**
- **Device Registration**: Managing connected devices and sensors
- **Data Collection**: APIs for receiving and processing sensor data
- **User Dashboards**: Interfaces for monitoring device status
- **Example**: A smart home system where users can manage their connected devices, set preferences, and monitor usage

### 7. **Educational Platforms**
- **Student Management**: Course enrollment, progress tracking
- **Content Delivery**: Learning materials with search and filtering
- **Assessment Systems**: Quiz and assignment management
- **Example**: An online learning platform where instructors manage student profiles, track progress, and deliver content

### 8. **Healthcare Applications**
- **Patient Management**: Secure handling of patient data (HIPAA compliant)
- **Appointment Systems**: Scheduling and management APIs
- **Medical Records**: Document management with search capabilities
- **Example**: A telemedicine platform where doctors can manage patient profiles, schedule appointments, and access medical histories

### 9. **Financial Services**
- **Customer Profiles**: KYC (Know Your Customer) data management
- **Transaction Processing**: Secure financial transaction APIs
- **Compliance Reporting**: Data retrieval for regulatory requirements
- **Example**: A fintech app where users can manage their financial profiles, view transaction history, and update preferences

### 10. **API-First Businesses**
- **Third-party Integrations**: Providing APIs for external developers
- **Microservices Architecture**: Building scalable, maintainable systems
- **Developer Platforms**: APIs that other developers build upon
- **Example**: A payment processing service that provides APIs for e-commerce platforms to integrate payment functionality

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

The test suite covers:
- **Endpoint Testing**: All HTTP methods and routes
- **Validation Testing**: Input validation and error handling
- **Edge Cases**: Invalid IDs, missing data, duplicate entries
- **Response Structure**: Ensuring consistent API responses
- **Performance**: Basic performance and memory usage checks

### Test Categories

1. **Unit Tests**: Individual function testing
2. **Integration Tests**: API endpoint testing
3. **Error Handling Tests**: Exception and error response testing
4. **Validation Tests**: Input validation and sanitization

## 👨‍💻 Development

### Project Structure

```
ci-cd-node-api/
├── __tests__/
│   └── server.test.js          # Comprehensive test suite
├── node_modules/
├── .gitignore
├── package.json
├── README.md
└── server.js                   # Main application file
```

### Development Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test
```

### Code Quality

- **ESLint**: Enforces code style and catches common errors
- **Jest**: Comprehensive testing framework
- **Consistent Error Handling**: Standardized error responses
- **Input Validation**: Robust validation for all endpoints
- **Security Best Practices**: Input sanitization and error message handling

## 🔄 CI/CD Integration

This project is designed for seamless CI/CD integration:

### GitHub Actions Example

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linting
      run: npm run lint
      
    - name: Run tests
      run: npm test
      
    - name: Run security audit
      run: npm audit

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to production
      run: |
        # Add your deployment commands here
        echo "Deploying to production..."
```

### Pipeline Stages

1. **Linting**: Code quality checks
2. **Testing**: Comprehensive test suite execution
3. **Security Audit**: Dependency vulnerability scanning
4. **Build**: Application building (if needed)
5. **Deploy**: Automated deployment to staging/production

## 🚀 Production Deployment

### Environment Variables

```bash
# Production environment
NODE_ENV=production
PORT=3000

# Database configuration (if using a database)
DATABASE_URL=your-database-url

# Logging
LOG_LEVEL=info
```

### Docker Support

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

### Health Checks

The `/health` endpoint provides:
- Application status
- System uptime
- Memory usage
- Version information

Perfect for:
- Load balancer health checks
- Container orchestration (Kubernetes)
- Monitoring systems integration

### Monitoring Integration

The API provides metrics suitable for:
- **Prometheus**: Custom metrics collection
- **Datadog**: APM and infrastructure monitoring
- **New Relic**: Application performance monitoring
- **AWS CloudWatch**: Cloud-native monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Follow existing code style
- Update documentation
- Ensure all tests pass
- Add meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Jest Testing Framework](https://jestjs.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Design Guidelines](https://restfulapi.net/)

---

**Built with ❤️ using Node.js, Express.js, and modern development practices.**
