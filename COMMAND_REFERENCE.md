# Command Reference Guide

## 🚀 Quick Start Commands

### Mac/Linux - Automatic Setup (Recommended)
```bash
chmod +x start-services.sh
bash start-services.sh install-and-start
```

### Windows - Automatic Setup
```cmd
start-services.bat install-and-start
```

### Manual Start (All Platforms)

**Terminal 1 - User Service:**
```bash
cd backend/user-service
npm install
npm run start:dev
```

**Terminal 2 - Product Service:**
```bash
cd backend/product-service
npm install
npm run start:dev
```

**Terminal 3 - Order Service:**
```bash
cd backend/order-service
npm install
npm run start:dev
```

**Terminal 4 - API Gateway:**
```bash
cd backend/api-gateway
npm install
npm run start:dev
```

---

## 📦 NPM Commands (For Each Service)

### Development
```bash
npm run start:dev      # Start with hot reload (development)
npm run start:debug    # Start in debug mode
```

### Production
```bash
npm run build          # Build TypeScript to JavaScript
npm run start:prod     # Start production build
```

### Testing
```bash
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Generate coverage report
npm run test:debug     # Debug tests
npm run test:e2e       # Run end-to-end tests
```

### Code Quality
```bash
npm run lint           # Run ESLint
npm run lint -- --fix  # Fix linting issues automatically
npm run format         # Format code with Prettier
```

### Build & Package
```bash
npm run build          # Production build
npm install            # Install dependencies
npm install --save     # Install and save to package.json
npm install --save-dev # Install as dev dependency
npm update             # Update dependencies
npm audit              # Check for security vulnerabilities
npm audit fix          # Fix security vulnerabilities
```

---

## 🐳 Docker Commands

### Build & Run
```bash
# Build all containers
docker-compose build

# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# Remove everything (including volumes)
docker-compose down -v
```

### Manage Services
```bash
# Restart services
docker-compose restart

# Restart specific service
docker-compose restart user-service

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs

# Follow logs
docker-compose logs -f

# Logs for specific service
docker-compose logs -f api-gateway
```

### Database
```bash
# Access MySQL container
docker-compose exec mysql mysql -u root -pMicr@1232

# Backup database
docker-compose exec mysql mysqldump -u root -pMicr@1232 user_db > user_db_backup.sql

# Restore database
docker-compose exec -T mysql mysql -u root -pMicr@1232 user_db < user_db_backup.sql
```

---

## 🔌 Port Management (Mac/Linux)

### Check Ports
```bash
# List all processes using ports
lsof -i -P -n

# Check specific port
lsof -i :3000
lsof -i :3001
lsof -i :3002
lsof -i :3003
lsof -i :3306  # MySQL
```

### Kill Process
```bash
# Kill specific process
kill -9 <PID>

# Kill by port (Mac/Linux)
kill -9 $(lsof -t -i :3000)
kill -9 $(lsof -t -i :3001)
kill -9 $(lsof -t -i :3002)
kill -9 $(lsof -t -i :3003)
```

---

## 🔌 Port Management (Windows)

### Check Ports
```cmd
# List all connections
netstat -ano

# Check specific port
netstat -ano | findstr :3000
netstat -ano | findstr :3001
```

### Kill Process
```cmd
# Kill by PID
taskkill /PID <PID> /F

# Find and kill by port
for /f "tokens=5" %a in ('netstat -ano ^| findstr :3000') do taskkill /PID %a /F
```

---

## 💾 Database Commands

### MySQL CLI
```bash
# Connect to MySQL
mysql -u root -p

# Enter password: Micr@1232

# Create database
CREATE DATABASE user_db;
CREATE DATABASE product_db;
CREATE DATABASE order_db;

# List databases
SHOW DATABASES;

# Switch to database
USE user_db;

# Show tables
SHOW TABLES;

# View table structure
DESC users;

# Query data
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM orders;

# Exit MySQL
EXIT;
```

### Execute SQL File
```bash
# Initialize databases
mysql -u root -p < init-databases.sql

# Backup database
mysqldump -u root -p user_db > user_db_backup.sql

# Restore database
mysql -u root -p user_db < user_db_backup.sql
```

---

## 🧪 Testing APIs

### Using curl

```bash
# Get all users
curl http://localhost:3000/api/users

# Get user by ID
curl http://localhost:3000/api/users/1

# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","role":"User"}'

# Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@test.com","role":"Admin"}'

# Delete user
curl -X DELETE http://localhost:3000/api/users/1

# Get all products
curl http://localhost:3000/api/products

# Get all orders
curl http://localhost:3000/api/orders

# Create product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":65000}'

# Create order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"product_id":1,"status":"Pending"}'
```

### Using Postman

1. Import `Postman_Collection.json`
2. Select request from collection
3. Click "Send"
4. View response

### Using Insomnia

1. New Request Collection
2. Add requests manually or
3. Import Postman collection

---

## 📝 Git Commands

### Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit: Microservices architecture setup"
git remote add origin <repository-url>
git push -u origin main
```

### Common Git Commands
```bash
# Check status
git status

# View changes
git diff

# Stage changes
git add .

# Commit changes
git commit -m "your message"

# Push changes
git push

# Pull latest
git pull

# Create branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# Merge branch
git merge feature/new-feature
```

---

## 📊 Monitoring & Logs

### View Service Logs
```bash
# Terminal running user-service
# Shows real-time logs

# For background services
docker-compose logs -f user-service
docker-compose logs -f product-service
docker-compose logs -f order-service
docker-compose logs -f api-gateway
```

### Check Service Health
```bash
# Test API Gateway
curl http://localhost:3000/api/users

# Test User Service directly
curl http://localhost:3001/api/users

# Test Product Service directly
curl http://localhost:3002/api/products

# Test Order Service directly
curl http://localhost:3003/api/orders
```

---

## 🔄 Update & Rebuild

### Update Dependencies
```bash
# Update all dependencies
npm update

# Update specific package
npm install <package>@latest

# Check outdated packages
npm outdated
```

### Rebuild Services
```bash
# Clean build
npm run build

# Production build
npm run build && npm run start:prod

# Full rebuild with dependencies
rm -rf node_modules
npm install
npm run build
```

---

## 🐛 Debugging

### Debug User Service
```bash
npm run start:debug

# Then use VS Code debugger with:
# - Chrome DevTools: chrome://inspect
# - VS Code: Attach to process
```

### Debug Tests
```bash
node --inspect-brk -r ts-node/register ./node_modules/.bin/jest --runInBand
```

### View Environment
```bash
# Show all environment variables
env

# Check specific variable
echo $NODE_ENV
echo $PORT
```

---

## 🧹 Cleanup Commands

### Clear npm Cache
```bash
npm cache clean --force
```

### Remove node_modules
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Clear Docker
```bash
# Remove containers
docker-compose down

# Remove images
docker-compose down --rmi all

# Remove volumes
docker-compose down -v

# Full cleanup
docker system prune -a --volumes
```

---

## 📋 File Operations

### Navigate Directories
```bash
# Go to service
cd backend/user-service
cd backend/product-service
cd backend/order-service
cd backend/api-gateway

# Go back
cd ..

# Current directory
pwd

# List files
ls -la
```

### View Files
```bash
# Display file contents
cat filename

# View with pagination
less filename

# Show first 10 lines
head -n 10 filename

# Show last 10 lines
tail -n 10 filename
```

---

## 🔍 Search & Find

### Search Code
```bash
# Find in files (case-insensitive)
grep -r "pattern" .

# Find TypeScript files
find . -name "*.ts" -type f

# Find in specific directory
find backend/user-service -name "*.ts"
```

---

## 📱 Service Status Verification

### Check All Services
```bash
# Create simple health check script
curl http://localhost:3000/api/users && echo "✓ API Gateway"
curl http://localhost:3001/api/users && echo "✓ User Service"
curl http://localhost:3002/api/products && echo "✓ Product Service"
curl http://localhost:3003/api/orders && echo "✓ Order Service"
```

---

## ⚙️ Configuration

### Environment Variables
```bash
# Create .env file
echo "PORT=3001" > .env
echo "NODE_ENV=development" >> .env

# View .env
cat .env

# Edit .env
nano .env  # or vim .env
```

### Update Configuration
```bash
# Edit app.module.ts for database config
# Edit main.ts for port config
# Update .env with new values
```

---

## 💡 Useful Tips

```bash
# Run command without stdout
command > /dev/null 2>&1

# Run in background
npm run start:dev &

# Get job ID
jobs

# Kill background job
kill %1

# Multiple commands
npm install && npm run build && npm run start:prod

# Redirect output to file
npm run test > test-results.txt 2>&1

# Chain commands with success check
npm run build && npm run test && npm run start:prod
```

---

**Save this file for quick reference!**
