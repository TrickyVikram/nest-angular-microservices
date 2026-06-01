# ✅ Microservices Setup Verification Checklist

## Pre-Startup Verification

- [ ] Node.js 20.x or higher installed

  ```bash
  node --version
  ```

- [ ] npm 10.x or higher installed

  ```bash
  npm --version
  ```

- [ ] MySQL 8.0 installed and running

  ```bash
  mysql --version
  mysql -u root -p -e "SELECT VERSION();"
  ```

- [ ] Ports 3000-3003 available (not in use)

  ```bash
  lsof -i :3000  # Should show nothing
  ```

- [ ] Git installed (optional)

  ```bash
  git --version
  ```

- [ ] Docker installed (optional, for Docker setup)
  ```bash
  docker --version
  ```

---

## Database Setup Verification

### Step 1: Create Databases

- [ ] Run SQL initialization script
  ```bash
  mysql -u root -p < init-databases.sql
  ```

### Step 2: Verify Databases Created

- [ ] Connect to MySQL
  ```bash
  mysql -u root -p
  ```
- [ ] List all databases
  ```sql
  SHOW DATABASES;
  ```
- [ ] Should see:
  - [ ] `user_db`
  - [ ] `product_db`
  - [ ] `order_db`

### Step 3: Verify Tables

- [ ] Use user database
  ```sql
  USE user_db;
  SHOW TABLES;
  ```
- [ ] Should see `users` table

  ```sql
  DESC users;
  SELECT * FROM users;
  ```

- [ ] Repeat for `product_db` and `order_db`

---

## Dependencies Installation Verification

### For Each Service:

```bash
cd backend/<service-name>
```

- [ ] Install dependencies

  ```bash
  npm install
  ```

- [ ] Check package.json updated with dependencies:
  - [ ] `@nestjs/common`
  - [ ] `@nestjs/core`
  - [ ] `@nestjs/typeorm`
  - [ ] `typeorm`
  - [ ] `mysql2`

- [ ] Verify node_modules exists

  ```bash
  ls -la | grep node_modules
  ```

- [ ] For API Gateway, check for `axios`
  ```bash
  grep "axios" package.json
  ```

---

## Service Files Verification

### User Service

- [ ] `src/user.entity.ts` exists
- [ ] `src/user.service.ts` exists
- [ ] `src/user.controller.ts` exists
- [ ] `src/app.module.ts` configured for TypeORM

### Product Service

- [ ] `src/product.entity.ts` exists
- [ ] `src/product.service.ts` exists
- [ ] `src/product.controller.ts` exists
- [ ] `src/app.module.ts` configured for TypeORM

### Order Service

- [ ] `src/order.entity.ts` exists
- [ ] `src/order.service.ts` exists
- [ ] `src/order.controller.ts` exists
- [ ] `src/app.module.ts` configured for TypeORM

### API Gateway

- [ ] `src/api-gateway.service.ts` exists
- [ ] `src/api-gateway.controller.ts` exists
- [ ] `src/app.module.ts` configured with gateway

---

## Pre-Launch Verification

### Compile Check

```bash
# For each service
npm run build
```

- [ ] Build succeeds for user-service
- [ ] Build succeeds for product-service
- [ ] Build succeeds for order-service
- [ ] Build succeeds for api-gateway

### TypeScript Check

```bash
npm run lint
```

- [ ] No critical errors (warnings are OK)

---

## Startup Verification

### Terminal 1: User Service (Port 3001)

```bash
cd backend/user-service
npm run start:dev
```

- [ ] Output shows: `Listening on port 3001`
- [ ] No error messages
- [ ] Database connection successful

### Terminal 2: Product Service (Port 3002)

```bash
cd backend/product-service
npm run start:dev
```

- [ ] Output shows: `Listening on port 3002`
- [ ] No error messages
- [ ] Database connection successful

### Terminal 3: Order Service (Port 3003)

```bash
cd backend/order-service
npm run start:dev
```

- [ ] Output shows: `Listening on port 3003`
- [ ] No error messages
- [ ] Database connection successful

### Terminal 4: API Gateway (Port 3000)

```bash
cd backend/api-gateway
npm run start:dev
```

- [ ] Output shows: `Listening on port 3000`
- [ ] No error messages
- [ ] All service connections established

---

## API Endpoint Verification

### Test User Service

```bash
curl http://localhost:3000/api/users
```

- [ ] Returns JSON array
- [ ] Contains sample user "Vikram Kumar"
- [ ] No error response

### Test Product Service

```bash
curl http://localhost:3000/api/products
```

- [ ] Returns JSON array
- [ ] Contains sample product "Laptop"
- [ ] No error response

### Test Order Service

```bash
curl http://localhost:3000/api/orders
```

- [ ] Returns JSON array
- [ ] Contains sample order with ID 101
- [ ] No error response

---

## CRUD Operations Verification

### Create Operations

- [ ] Create User

  ```bash
  curl -X POST http://localhost:3000/api/users \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","role":"User"}'
  ```

  - [ ] Returns 201/200 with new user object

- [ ] Create Product

  ```bash
  curl -X POST http://localhost:3000/api/products \
    -H "Content-Type: application/json" \
    -d '{"name":"Desktop","price":50000}'
  ```

  - [ ] Returns 201/200 with new product object

- [ ] Create Order
  ```bash
  curl -X POST http://localhost:3000/api/orders \
    -H "Content-Type: application/json" \
    -d '{"product_id":1,"status":"Pending"}'
  ```

  - [ ] Returns 201/200 with new order object

### Read Operations

- [ ] Get all users: `curl http://localhost:3000/api/users`
  - [ ] Returns array of users

- [ ] Get single user: `curl http://localhost:3000/api/users/1`
  - [ ] Returns user object with ID 1

- [ ] Same verification for products and orders

### Update Operations

- [ ] Update user
  ```bash
  curl -X PUT http://localhost:3000/api/users/1 \
    -H "Content-Type: application/json" \
    -d '{"name":"Updated","email":"updated@test.com","role":"Admin"}'
  ```

  - [ ] Returns updated user object

### Delete Operations

- [ ] Delete user
  ```bash
  curl -X DELETE http://localhost:3000/api/users/2
  ```

  - [ ] Returns success message

---

## Database Persistence Verification

### Verify Data Saved

```bash
mysql -u root -p -e "SELECT * FROM user_db.users;"
mysql -u root -p -e "SELECT * FROM product_db.products;"
mysql -u root -p -e "SELECT * FROM order_db.orders;"
```

- [ ] Created users appear in database
- [ ] Created products appear in database
- [ ] Created orders appear in database

---

## Performance Verification

### Response Time Check

```bash
# Should respond in < 100ms
curl -w "Response time: %{time_total}s\n" http://localhost:3000/api/users
```

- [ ] User Service responds quickly
- [ ] Product Service responds quickly
- [ ] Order Service responds quickly
- [ ] API Gateway routing is fast

---

## Error Handling Verification

### Test Error Scenarios

- [ ] Get non-existent user: `curl http://localhost:3000/api/users/9999`
  - [ ] Returns null or empty object

- [ ] Invalid POST data

  ```bash
  curl -X POST http://localhost:3000/api/users \
    -H "Content-Type: application/json" \
    -d '{"name":"Test"}'  # Missing email and role
  ```

  - [ ] Returns validation error

- [ ] Wrong HTTP method
  ```bash
  curl -X PUT http://localhost:3000/api/users  # Wrong method for create
  ```

  - [ ] Returns appropriate error

---

## Logging Verification

### Check Console Output

- [ ] Each service shows startup messages
- [ ] Database connection logs visible
- [ ] Request logs show in console
- [ ] Error messages are informative

### Example: Should See

```
[Nest] ... - 01/01/2024, 00:00:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] ... - 01/01/2024, 00:00:00 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized
[Nest] ... - 01/01/2024, 00:00:00 AM     LOG [InstanceLoader] UserModule dependencies initialized
[Nest] ... - 01/01/2024, 00:00:00 AM     LOG [NestApplication] Nest application successfully started
```

---

## Documentation Verification

- [ ] `README_START_HERE.md` exists and readable
- [ ] `QUICK_START.md` exists and comprehensive
- [ ] `MICROSERVICES_SETUP.md` exists with detailed setup
- [ ] `ARCHITECTURE_DIAGRAM.md` exists with diagrams
- [ ] `COMMAND_REFERENCE.md` exists with commands
- [ ] `backend/README.md` exists and complete

---

## Configuration Verification

- [ ] `.env.example` file exists
- [ ] Database credentials correct in app.module.ts
- [ ] Ports configured correctly (3000, 3001, 3002, 3003)
- [ ] API Gateway routes correctly configured

---

## Additional Verification

### Docker Verification (if using)

- [ ] `docker-compose.yml` exists
- [ ] `Dockerfile` exists for each service
- [ ] Docker images build successfully
- [ ] Services start in Docker

### Testing Verification

- [ ] Unit tests exist: `npm run test`
- [ ] E2E tests exist: `npm run test:e2e`
- [ ] Tests pass (optional for now)

### Code Quality Verification

- [ ] Linting passes: `npm run lint`
- [ ] No critical issues
- [ ] Code is formatted: `npm run format`

---

## Final Verification Checklist

- [ ] All 4 services running without errors
- [ ] API Gateway accessible at http://localhost:3000
- [ ] All API endpoints responding correctly
- [ ] Database operations working (CRUD)
- [ ] Sample data persisted in databases
- [ ] Error handling working
- [ ] Response times acceptable
- [ ] Logging visible in console
- [ ] Documentation accessible
- [ ] Configuration files in place

---

## Troubleshooting If Failed

| Issue                   | Solution                                      |
| ----------------------- | --------------------------------------------- |
| Port already in use     | See "Port Management" in COMMAND_REFERENCE.md |
| MySQL connection error  | Verify MySQL running, check credentials       |
| Dependencies missing    | Run `npm install` in each service             |
| Build fails             | Clear node_modules, run `npm install` again   |
| Endpoint not responding | Check if service is actually running          |
| Database tables missing | Run `init-databases.sql`                      |
| Slow response           | Check database query performance              |

---

## Post-Verification Next Steps

✅ All tests passed? Proceed to:

1. **Integrate with Angular Frontend**
   - Update Angular services to call these APIs
   - Configure proxy settings if needed

2. **Add Authentication** (Optional)
   - Implement JWT authentication
   - Add role-based access control

3. **Add Business Logic** (Optional)
   - Implement more complex queries
   - Add validation rules
   - Add error handling middleware

4. **Deploy to Production** (Optional)
   - Use Docker for containerization
   - Deploy to cloud provider
   - Setup CI/CD pipeline

---

**When all items are checked, your microservices are ready for development!** ✅
