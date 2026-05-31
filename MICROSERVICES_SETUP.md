# Microservices Architecture Setup Guide

## Overview
This project implements a microservices architecture with:
- **API Gateway** (Port 3000): Central entry point for all requests
- **User Service** (Port 3001): Manages user data
- **Product Service** (Port 3002): Manages product data
- **Order Service** (Port 3003): Manages order data

Each service has its own MySQL database.

## Database Configuration

### Database Credentials
- **Username**: root
- **Password**: Micr@1232
- **Host**: localhost
- **Port**: 3306

### Create Databases

Run these SQL commands in phpMyAdmin or MySQL CLI:

```sql
-- Create User Database
CREATE DATABASE user_db;

-- Create Product Database
CREATE DATABASE product_db;

-- Create Order Database
CREATE DATABASE order_db;
```

### Database Structure

#### user_db.users table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(100) NOT NULL
);

INSERT INTO users (name, email, role) VALUES 
('Vikram Kumar', 'vikram@terknox.com', 'Admin');
```

#### product_db.products table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

INSERT INTO products (name, price) VALUES 
('Laptop', 65000);
```

#### order_db.orders table
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  status VARCHAR(100) NOT NULL
);

INSERT INTO orders (product_id, status) VALUES 
(1, 'Delivered');
```

## API Endpoints (via API Gateway)

### Users API
- **GET** `http://localhost:3000/api/users` - Get all users
- **GET** `http://localhost:3000/api/users/:id` - Get user by ID
- **POST** `http://localhost:3000/api/users` - Create user
- **PUT** `http://localhost:3000/api/users/:id` - Update user
- **DELETE** `http://localhost:3000/api/users/:id` - Delete user

### Products API
- **GET** `http://localhost:3000/api/products` - Get all products
- **GET** `http://localhost:3000/api/products/:id` - Get product by ID
- **POST** `http://localhost:3000/api/products` - Create product
- **PUT** `http://localhost:3000/api/products/:id` - Update product
- **DELETE** `http://localhost:3000/api/products/:id` - Delete product

### Orders API
- **GET** `http://localhost:3000/api/orders` - Get all orders
- **GET** `http://localhost:3000/api/orders/:id` - Get order by ID
- **POST** `http://localhost:3000/api/orders` - Create order
- **PUT** `http://localhost:3000/api/orders/:id` - Update order
- **DELETE** `http://localhost:3000/api/orders/:id` - Delete order

## Installation & Setup

### Step 1: Install Dependencies

For each service, run:

```bash
# API Gateway
cd backend/api-gateway
npm install

# User Service
cd backend/user-service
npm install

# Product Service
cd backend/product-service
npm install

# Order Service
cd backend/order-service
npm install
```

### Step 2: Start Services

Open separate terminals and run:

```bash
# Terminal 1: User Service (Port 3001)
cd backend/user-service
npm run start:dev

# Terminal 2: Product Service (Port 3002)
cd backend/product-service
npm run start:dev

# Terminal 3: Order Service (Port 3003)
cd backend/order-service
npm run start:dev

# Terminal 4: API Gateway (Port 3000)
cd backend/api-gateway
npm run start:dev
```

## Testing the APIs

### Sample Request & Response

**Request:**
```bash
curl http://localhost:3000/api/users
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Vikram Kumar",
    "email": "vikram@terknox.com",
    "role": "Admin"
  }
]
```

## Database Management

Access phpMyAdmin:
- `http://localhost/phpmyadmin/index.php?route=/database/structure&db=user_db`
- `http://localhost/phpmyadmin/index.php?route=/database/structure&db=product_db`
- `http://localhost/phpmyadmin/index.php?route=/database/structure&db=order_db`

## Architecture Diagram

```
┌─────────────────────────────────────────────┐
│          Angular Frontend (Port 4200)       │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│      API Gateway (Port 3000)                │
│   - Routes requests to microservices       │
│   - Handles CORS                           │
└──┬───────────────┬──────────────┬──────────┘
   │               │              │
   ▼               ▼              ▼
┌─────────┐  ┌──────────┐  ┌────────────┐
│ User    │  │ Product  │  │   Order    │
│Service  │  │ Service  │  │  Service   │
│:3001    │  │:3002     │  │  :3003     │
└────┬────┘  └────┬─────┘  └─────┬──────┘
     │            │              │
     ▼            ▼              ▼
  ┌────┐      ┌────┐         ┌────┐
  │user│      │prod│         │order│
  │_db │      │uct_│         │_db  │
  └────┘      │db  │         └────┘
              └────┘

        MySQL Databases
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### MySQL Connection Error
- Ensure MySQL is running
- Verify credentials in app.module.ts
- Check database exists

### CORS Issues
- API Gateway handles CORS by default
- Add CORS configuration if needed in main.ts

## Development Commands

```bash
# Build service
npm run build

# Start in watch mode
npm run start:dev

# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Format code
npm run format

# Lint code
npm run lint
