@echo off
REM Windows batch script to start microservices

echo.
echo ========================================
echo Starting Nest Microservices
echo ========================================
echo.

REM Check if npm is installed
where npm >nul 2>nul
if errorlevel 1 (
    echo npm is not installed. Please install Node.js and npm.
    exit /b 1
)

if "%1"=="install" (
    echo Installing dependencies...
    
    echo Installing User Service...
    cd backend\user-service
    call npm install
    cd ..\..
    
    echo Installing Product Service...
    cd backend\product-service
    call npm install
    cd ..\..
    
    echo Installing Order Service...
    cd backend\order-service
    call npm install
    cd ..\..
    
    echo Installing API Gateway...
    cd backend\api-gateway
    call npm install
    cd ..\..
    
    echo.
    echo All dependencies installed successfully
) else if "%1"=="start" (
    echo.
    echo Starting services...
    echo.
    echo Please open separate Command Prompt windows and run:
    echo.
    echo Terminal 1 - User Service:
    echo cd backend\user-service
    echo npm run start:dev
    echo.
    echo Terminal 2 - Product Service:
    echo cd backend\product-service
    echo npm run start:dev
    echo.
    echo Terminal 3 - Order Service:
    echo cd backend\order-service
    echo npm run start:dev
    echo.
    echo Terminal 4 - API Gateway:
    echo cd backend\api-gateway
    echo npm run start:dev
    echo.
    echo Service URLs:
    echo API Gateway:    http://localhost:3000
    echo User Service:   http://localhost:3001
    echo Product Service: http://localhost:3002
    echo Order Service:  http://localhost:3003
) else if "%1"=="install-and-start" (
    REM Install dependencies
    echo Installing dependencies...
    
    echo Installing User Service...
    cd backend\user-service
    call npm install
    cd ..\..
    
    echo Installing Product Service...
    cd backend\product-service
    call npm install
    cd ..\..
    
    echo Installing Order Service...
    cd backend\order-service
    call npm install
    cd ..\..
    
    echo Installing API Gateway...
    cd backend\api-gateway
    call npm install
    cd ..\..
    
    echo.
    echo Starting services...
    echo.
    echo Please open separate Command Prompt windows and run:
    echo.
    echo Terminal 1 - User Service:
    echo cd backend\user-service
    echo npm run start:dev
    echo.
    echo Terminal 2 - Product Service:
    echo cd backend\product-service
    echo npm run start:dev
    echo.
    echo Terminal 3 - Order Service:
    echo cd backend\order-service
    echo npm run start:dev
    echo.
    echo Terminal 4 - API Gateway:
    echo cd backend\api-gateway
    echo npm run start:dev
    echo.
    echo Service URLs:
    echo API Gateway:    http://localhost:3000
    echo User Service:   http://localhost:3001
    echo Product Service: http://localhost:3002
    echo Order Service:  http://localhost:3003
) else (
    echo Usage:
    echo   %0 install              - Install dependencies for all services
    echo   %0 start                - Show instructions to start services
    echo   %0 install-and-start    - Install and show start instructions
)
