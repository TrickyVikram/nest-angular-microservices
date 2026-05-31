# NestJS Microservices Backend

This is a scalable microservices architecture built with NestJS, featuring an API Gateway pattern with independent services for users, products, and orders.

## Architecture

```
┌─────────────────────────────────────────┐
│       API Gateway (Port 3000)           │
│    Central Entry Point for All APIs     │
└──┬────────────────┬────────────────┬────┘
   │                │                │
   ▼                ▼                ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  User    │  │ Product  │  │  Order   │
│ Service  │  │ Service  │  │ Service  │
│:3001     │  │ :3002    │  │  :3003   │
└──┬───────┘  └──┬───────┘  └──┬───────┘
   │            │             │
   ▼            ▼             ▼
 user_db    product_db     order_db
 (MySQL)    (MySQL)       (MySQL)
```

## Services Overview

### 1. API Gateway (Port 3000)
- Central request routing
- Request/Response proxying
- CORS handling
- Service discovery

### 2. User Service (Port 3001)
- User management
- User authentication/authorization
- User profile management

### 3. Product Service (Port 3002)
- Product catalog management
- Product pricing
- Inventory management

### 4. Order Service (Port 3003)
- Order management
- Order status tracking
- Order history

## Technology Stack

- **Runtime**: Node.js 20+
- **Framework**: NestJS 11.x
- **Database**: MySQL 8.0
- **ORM**: TypeORM 0.3.x
- **API Client**: Axios
- **Language**: TypeScript 5.x

## Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- MySQL 8.0 or higher
- Git

## Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd nest-angular-microservices
```

### Step 2: Install Dependencies

```bash
# Install all services at once
bash start-services.sh install

# Or install individually
cd backend/user-service && npm install
cd backend/product-service && npm install
cd backend/order-service && npm install
cd backend/api-gateway && npm install
```

### Step 3: Setup Databases

Create MySQL databases:

```bash
mysql -u root -p < init-databases.sql
```

Or manually in phpMyAdmin/MySQL CLI:

```sql
CREATE DATABASE user_db;
CREATE DATABASE product_db;
CREATE DATABASE order_db;
```

## Configuration

### Update Database Credentials

Edit each service's `src/app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Micr@1232',
  database: 'service_name_db',
  entities: [Entity],
  synchronize: true,
})
```

## Running Services

### Option 1: Using Startup Script

```bash
# Make script executable
chmod +x start-services.sh

# Install and start
bash start-services.sh install-and-start

# Or just start (if already installed)
bash start-services.sh start
```

### Option 2: Manual Start (Separate Terminals)

Terminal 1 - User Service:
```bash
cd backend/user-service
npm run start:dev
```

Terminal 2 - Product Service:
```bash
cd backend/product-service
npm run start:dev
```

Terminal 3 - Order Service:
```bash
cd backend/order-service
npm run start:dev
```

Terminal 4 - API Gateway:
```bash
cd backend/api-gateway
npm run start:dev
```

### Option 3: Using Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d
```

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create new product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | Get all orders |
| GET | `/orders/:id` | Get order by ID |
| POST | `/orders` | Create new order |
| PUT | `/orders/:id` | Update order |
| DELETE | `/orders/:id` | Delete order |

## API Examples

### Get All Users
```bash
curl -X GET http://localhost:3000/api/users
```

Response:
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

### Create New User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }'
```

### Get All Products
```bash
curl -X GET http://localhost:3000/api/products
```

Response:
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 65000
  }
]
```

### Create New Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "status": "Pending"
  }'
```

## Development Commands

### Build
```bash
# Build specific service
cd backend/<service-name>
npm run build

# Production build
npm run build
```

### Development with Watch Mode
```bash
npm run start:dev
```

### Debug Mode
```bash
npm run start:debug
```

### Production Start
```bash
npm run start:prod
```

### Testing
```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

### Linting
```bash
# Run ESLint
npm run lint

# Fix linting errors
npm run lint -- --fix
```

### Code Formatting
```bash
npm run format
```

## Database Management

### phpMyAdmin Access
- User Database: `http://localhost/phpmyadmin/index.php?route=/database/structure&db=user_db`
- Product Database: `http://localhost/phpmyadmin/index.php?route=/database/structure&db=product_db`
- Order Database: `http://localhost/phpmyadmin/index.php?route=/database/structure&db=order_db`

### MySQL CLI Access
```bash
# Connect to MySQL
mysql -u root -p

# Switch to user_db
USE user_db;

# View tables
SHOW TABLES;

# View users
SELECT * FROM users;
```

## Troubleshooting

### Port Already in Use
```bash
# macOS/Linux - Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MySQL Connection Error
- Ensure MySQL is running
- Verify credentials in app.module.ts
- Check if database exists
- Verify MySQL port (default: 3306)

### Service Won't Start
- Check logs in terminal
- Verify dependencies installed: `npm install`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### CORS Issues
- API Gateway handles CORS automatically
- If issues persist, add CORS to main.ts:
```typescript
app.enableCors();
```

## Environment Variables

Create `.env` file in each service:

```env
# User Service
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=Micr@1232
DB_NAME=user_db
```

## File Structure

```
backend/
├── api-gateway/
│   ├── src/
│   │   ├── api-gateway.service.ts
│   │   ├── api-gateway.controller.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── Dockerfile
├── user-service/
│   ├── src/
│   │   ├── user.entity.ts
│   │   ├── user.service.ts
│   │   ├── user.controller.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── Dockerfile
├── product-service/
│   └── [similar structure]
└── order-service/
    └── [similar structure]
```

## Production Deployment

### Using Docker

```bash
# Build images
docker-compose build

# Start all services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f <service-name>
```

### Environment Configuration
```bash
# Create .env file with production values
NODE_ENV=production
DB_HOST=<production-db-host>
DB_PASSWORD=<production-db-password>
```

## Performance Tips

1. **Enable Query Caching**: Configure TypeORM caching
2. **Use Connection Pooling**: Set connection pool size
3. **Implement Rate Limiting**: Add rate limiting middleware
4. **Use Load Balancing**: Deploy multiple instances
5. **Monitor Performance**: Use APM tools

## Security Considerations

1. Use environment variables for secrets
2. Implement authentication/authorization
3. Validate all inputs
4. Use HTTPS in production
5. Implement CORS properly
6. Add rate limiting
7. Keep dependencies updated

## Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Create Pull Request

## License

This project is licensed under the UNLICENSED license.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the logs
3. Create an issue on GitHub
4. Contact the development team

## Useful Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [MySQL Documentation](https://dev.mysql.com/doc)
- [Docker Documentation](https://docs.docker.com)

---

**Last Updated**: June 2024
