# Microservices Architecture Diagram

## Overall Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│                        Angular Frontend                              │
│                      (Port 4200)                                     │
│                                                                       │
└────────────────────────┬────────────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│                 API GATEWAY (Port 3000)                              │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Route Requests to:                                          │   │
│  │  • /api/users    → User Service (3001)                       │   │
│  │  • /api/products → Product Service (3002)                    │   │
│  │  • /api/orders   → Order Service (3003)                      │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────┬──────────────────────┬──────────────────┬────────────────┘
          │                      │                  │
          ▼                      ▼                  ▼
┌──────────────────┐  ┌─────────────────┐  ┌──────────────────┐
│  USER SERVICE    │  │PRODUCT SERVICE  │  │ ORDER SERVICE    │
│  (Port 3001)     │  │ (Port 3002)     │  │ (Port 3003)      │
│                  │  │                 │  │                  │
│ ┌──────────────┐ │  │ ┌────────────┐  │  │ ┌──────────────┐ │
│ │ Controller   │ │  │ │ Controller │  │  │ │ Controller   │ │
│ │ Service      │ │  │ │ Service    │  │  │ │ Service      │ │
│ │ Entity       │ │  │ │ Entity     │  │  │ │ Entity       │ │
│ └──────────────┘ │  │ └────────────┘  │  │ └──────────────┘ │
│                  │  │                 │  │                  │
└────────┬─────────┘  └────────┬────────┘  └────────┬─────────┘
         │                     │                    │
         │ TypeORM             │ TypeORM            │ TypeORM
         │                     │                    │
         ▼                     ▼                    ▼
    ┌────────┐            ┌────────┐          ┌────────┐
    │        │            │        │          │        │
    │user_db │            │product │          │order_db│
    │        │            │_db     │          │        │
    └────────┘            │        │          └────────┘
   (MySQL 3306)           └────────┘        (MySQL 3306)
                       (MySQL 3306)
```

## Database Schema

### user_db.users
```
┌─────────────────────────────────┐
│          USERS                  │
├─────────────────────────────────┤
│ ✓ id (PK, AUTO INCREMENT)       │
│ • name (VARCHAR)                │
│ • email (VARCHAR, UNIQUE)       │
│ • role (VARCHAR)                │
│ • created_at (TIMESTAMP)        │
│ • updated_at (TIMESTAMP)        │
└─────────────────────────────────┘
```

### product_db.products
```
┌─────────────────────────────────┐
│       PRODUCTS                  │
├─────────────────────────────────┤
│ ✓ id (PK, AUTO INCREMENT)       │
│ • name (VARCHAR)                │
│ • price (DECIMAL(10,2))         │
│ • created_at (TIMESTAMP)        │
│ • updated_at (TIMESTAMP)        │
└─────────────────────────────────┘
```

### order_db.orders
```
┌─────────────────────────────────┐
│        ORDERS                   │
├─────────────────────────────────┤
│ ✓ id (PK, AUTO INCREMENT)       │
│ • product_id (INT)              │
│ • status (VARCHAR)              │
│ • created_at (TIMESTAMP)        │
│ • updated_at (TIMESTAMP)        │
└─────────────────────────────────┘
```

## API Request Flow

### Example: Get All Users
```
┌─────────────┐
│   Client    │
│   Postman   │
│   Browser   │
└──────┬──────┘
       │
       │ GET /api/users
       ▼
┌─────────────────────────┐
│    API GATEWAY          │
│   (3000)                │
│ Match route → /api/users
└──────┬──────────────────┘
       │
       │ Forward to User Service
       ▼
┌─────────────────────────┐
│   USER SERVICE          │
│   (3001)                │
│ UserController.findAll()
└──────┬──────────────────┘
       │
       │ Query database
       ▼
┌──────────────────────────┐
│  TypeORM Repository      │
│  find() all users        │
└──────┬───────────────────┘
       │
       │ SQL Query
       ▼
┌──────────────────────────┐
│   MySQL Database         │
│   SELECT * FROM users    │
│   user_db                │
└──────┬───────────────────┘
       │
       │ Query Result [User]
       ▼
┌──────────────────────────┐
│ JSON Response            │
│ [                        │
│   {id, name, email, ...} │
│ ]                        │
└──────┬───────────────────┘
       │
       ▼
   Browser / Client
```

## Request Routing Logic

```
API Gateway receives request to: http://localhost:3000/api/users

                    ▼

    Analyze path and method

                    ▼

        ┌─────────────────────────┐
        │ Route Path Analysis     │
        │                         │
        │ /api/users → UserSvc    │
        │ /api/products → ProdSvc │
        │ /api/orders → OrderSvc  │
        └──────────┬──────────────┘
                   ▼
        Direct to appropriate
        microservice:3001/3002/3003

                   ▼

        Service processes request

                   ▼

    Database query (TypeORM)

                   ▼

    Return response back
    through gateway to client
```

## Data Flow: Create User

```
CLIENT
  │
  ├─ POST /api/users
  ├─ {name, email, role}
  │
  ▼ (API Gateway Port 3000)
  │
  ├─ Route to User Service (Port 3001)
  │
  ▼ (User Service)
  │
  ├─ UserController.create()
  ├─ UserService.create()
  │
  ▼ (TypeORM)
  │
  ├─ Repository.save(userData)
  │
  ▼ (MySQL - user_db)
  │
  ├─ INSERT INTO users VALUES (...)
  ├─ Get inserted ID
  │
  ▼ (Response back through layers)
  │
  ├─ Return created user object
  ├─ {id, name, email, role, created_at, updated_at}
  │
  ▼ CLIENT
```

## Service Communication Pattern

```
┌─────────────────────────────────────────────────────┐
│            API GATEWAY PROXY PATTERN                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Gateway receives: GET /api/users                  │
│                     ▼                              │
│  Build service URL: http://localhost:3001/api/users
│                     ▼                              │
│  Make HTTP request (axios)                         │
│                     ▼                              │
│  Get response from User Service                    │
│                     ▼                              │
│  Return to client                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Deployment Architecture (Docker)

```
┌──────────────────────────────────────────────────┐
│         Docker Container Network                 │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ API      │  │ User     │  │ Product  │      │
│  │ Gateway  │  │ Service  │  │ Service  │      │
│  │ :3000    │  │ :3001    │  │ :3002    │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│  ┌──────────┐                                   │
│  │ Order    │                                   │
│  │ Service  │                                   │
│  │ :3003    │                                   │
│  └──────────┘                                   │
│         ▲                                        │
│         │                                        │
│         ▼                                        │
│  ┌──────────────────────────────────┐           │
│  │      MySQL Container             │           │
│  │  (Single MySQL for Demo)         │           │
│  │  All 3 databases: 3306           │           │
│  └──────────────────────────────────┘           │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Technology Stack

```
┌──────────────────────────────────────┐
│    Runtime Environment               │
│  ┌───────────────────────────────┐   │
│  │ Node.js 20.x                  │   │
│  └───────────────────────────────┘   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│    Application Layer                 │
│  ┌───────────────────────────────┐   │
│  │ NestJS 11.x                   │   │
│  │ TypeScript 5.x                │   │
│  │ Express.js (HTTP Server)      │   │
│  └───────────────────────────────┘   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│    Data Access Layer                 │
│  ┌───────────────────────────────┐   │
│  │ TypeORM 0.3.x                 │   │
│  │ MySQL Driver (mysql2)         │   │
│  └───────────────────────────────┘   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│    Database Layer                    │
│  ┌───────────────────────────────┐   │
│  │ MySQL 8.0                     │   │
│  │ 3 Independent Databases       │   │
│  └───────────────────────────────┘   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│    Container Layer (Optional)        │
│  ┌───────────────────────────────┐   │
│  │ Docker & Docker Compose       │   │
│  └───────────────────────────────┘   │
└──────────────────────────────────────┘
```

## Development vs Production

```
┌─────────────────────┐         ┌──────────────────────┐
│   DEVELOPMENT       │         │   PRODUCTION         │
├─────────────────────┤         ├──────────────────────┤
│                     │         │                      │
│ npm run start:dev   │         │ npm run build        │
│ Hot reload enabled  │         │ npm run start:prod   │
│ Source maps enabled │         │ Optimized build      │
│ Logging verbose     │         │ Minimal logging      │
│ Watch mode          │         │ Compiled JS only     │
│ localhost:3XXX      │         │ Docker containers    │
│                     │         │ Load balanced        │
│ Direct MySQL access │         │ Production DB        │
│ Development DB      │         │ Environment config   │
│                     │         │                      │
└─────────────────────┘         └──────────────────────┘
```

---

**This diagram shows the complete microservices architecture with all connections and data flows.**
