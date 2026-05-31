#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Starting Nest Microservices${NC}"
echo -e "${GREEN}========================================${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install Node.js and npm.${NC}"
    exit 1
fi

# Install dependencies for all services
install_dependencies() {
    echo -e "${YELLOW}Installing dependencies...${NC}"
    
    services=("api-gateway" "user-service" "product-service" "order-service")
    for service in "${services[@]}"; do
        echo -e "${YELLOW}Installing dependencies for $service...${NC}"
        cd backend/$service
        npm install
        if [ $? -ne 0 ]; then
            echo -e "${RED}Failed to install dependencies for $service${NC}"
            exit 1
        fi
        cd ../..
    done
    echo -e "${GREEN}All dependencies installed successfully${NC}"
}

# Start services
start_services() {
    echo -e "${YELLOW}Starting services...${NC}"
    
    # Start User Service
    echo -e "${YELLOW}Starting User Service (Port 3001)...${NC}"
    cd backend/user-service
    npm run start:dev &
    USER_SERVICE_PID=$!
    cd ../..
    sleep 2
    
    # Start Product Service
    echo -e "${YELLOW}Starting Product Service (Port 3002)...${NC}"
    cd backend/product-service
    npm run start:dev &
    PRODUCT_SERVICE_PID=$!
    cd ../..
    sleep 2
    
    # Start Order Service
    echo -e "${YELLOW}Starting Order Service (Port 3003)...${NC}"
    cd backend/order-service
    npm run start:dev &
    ORDER_SERVICE_PID=$!
    cd ../..
    sleep 2
    
    # Start API Gateway
    echo -e "${YELLOW}Starting API Gateway (Port 3000)...${NC}"
    cd backend/api-gateway
    npm run start:dev &
    GATEWAY_PID=$!
    cd ../..
    
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}All services started successfully!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${YELLOW}Service URLs:${NC}"
    echo -e "  API Gateway:    ${GREEN}http://localhost:3000${NC}"
    echo -e "  User Service:   ${GREEN}http://localhost:3001${NC}"
    echo -e "  Product Service: ${GREEN}http://localhost:3002${NC}"
    echo -e "  Order Service:  ${GREEN}http://localhost:3003${NC}"
    echo ""
    echo -e "${YELLOW}Press CTRL+C to stop all services${NC}"
    
    # Wait for all services
    wait
}

# Main script
if [ "$1" == "install" ]; then
    install_dependencies
elif [ "$1" == "start" ]; then
    start_services
elif [ "$1" == "install-and-start" ]; then
    install_dependencies
    start_services
else
    echo -e "${YELLOW}Usage:${NC}"
    echo "  $0 install              - Install dependencies for all services"
    echo "  $0 start                - Start all services"
    echo "  $0 install-and-start    - Install dependencies and start all services"
fi
