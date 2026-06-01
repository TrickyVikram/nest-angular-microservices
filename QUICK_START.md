# Quick Start Guide

## For Mac/Linux Users

### Step 1: Make Script Executable

```bash
chmod +x start-services.sh
```

### Step 2: Install Dependencies & Start Services

```bash
bash start-services.sh install-and-start
```

**That's it!** All services will start automatically.

---

## For Windows Users

### Step 1: Install Dependencies

```cmd
start-services.bat install
```

### Step 2: Start Services

Open 4 separate Command Prompt windows and run each:

**Window 1 - User Service:**

```cmd
cd backend\user-service
npm run start:dev
```

**Window 2 - Product Service:**

```cmd
cd backend\product-service
npm run start:dev
```

**Window 3 - Order Service:**

```cmd
cd backend\order-service
npm run start:dev
```

**Window 4 - API Gateway:**

```cmd
cd backend\api-gateway
npm run start:dev
```

---

## Testing the API

Once all services are running, test with:

### Get All Users

```bash
curl http://localhost:3000/api/users
```

Expected response:

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

### Get All Products

```bash
curl http://localhost:3000/api/products
```

### Get All Orders

```bash
curl http://localhost:3000/api/orders
```

### Create New User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "User"
  }'
```

### Create New Product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Desktop",
    "price": 50000
  }'
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

---

## Using Docker (Optional)

If you have Docker installed:

```bash
docker-compose up --build
```

---

## Service URLs

| Service         | URL                   |
| --------------- | --------------------- |
| API Gateway     | http://localhost:3000 |
| User Service    | http://localhost:3001 |
| Product Service | http://localhost:3002 |
| Order Service   | http://localhost:3003 |

---

## Database Access

### phpMyAdmin

- User Database: http://localhost/phpmyadmin/?route=/database/structure&db=user_db
- Product Database: http://localhost/phpmyadmin/?route=/database/structure&db=product_db
- Order Database: http://localhost/phpmyadmin/?route=/database/structure&db=order_db

**Credentials:**

- Username: `root`
- Password: `Micr@1232`

---

## Postman Testing

1. Open Postman
2. Click "Import"
3. Select `Postman_Collection.json`
4. Test all endpoints directly from Postman

---

## Troubleshooting

### Port Already in Use (macOS/Linux)

```bash
lsof -i :3000
kill -9 <PID>
```

### Port Already in Use (Windows)

```cmd
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MySQL Connection Error

- Ensure MySQL is running
- Check credentials: `root` / `Micr@1232`
- Verify databases exist (run `init-databases.sql`)

### Dependencies Issues

```bash
# Clear and reinstall
rm -rf node_modules
npm install
```

---

## File Locations

- **Setup Guide**: `MICROSERVICES_SETUP.md`
- **Backend README**: `backend/README.md`
- **Docker Compose**: `docker-compose.yml`
- **Postman Collection**: `Postman_Collection.json`
- **Setup Status**: `SETUP_COMPLETE.md`

---

## What's Included

✅ API Gateway (port 3000)
✅ User Service (port 3001) with MySQL database
✅ Product Service (port 3002) with MySQL database
✅ Order Service (port 3003) with MySQL database
✅ TypeORM integration for all services
✅ Docker support
✅ Postman collection for testing
✅ Sample data in databases

---

## Next Steps

After verification:

1. ✅ Confirm all 4 services running
2. ✅ Test API endpoints
3. ✅ Verify database content in phpMyAdmin
4. ✅ Integrate with Angular frontend

---

**Questions?** See `MICROSERVICES_SETUP.md` or `backend/README.md` for detailed documentation.
