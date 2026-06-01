import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller('api')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('users')
  getAllUsers() {
    return this.apiGatewayService.proxyRequest('users', 'GET', '/api/users');
  }

  @Get('users/:id')
  getUserById(@Param('id') id: string) {
    return this.apiGatewayService.proxyRequest(
      'users',
      'GET',
      `/api/users/${id}`,
    );
  }

  @Post('users')
  createUser(@Body() user: any) {
    return this.apiGatewayService.proxyRequest(
      'users',
      'POST',
      '/api/users',
      user,
    );
  }

  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() user: any) {
    return this.apiGatewayService.proxyRequest(
      'users',
      'PUT',
      `/api/users/${id}`,
      user,
    );
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    await this.apiGatewayService.proxyRequest(
      'users',
      'DELETE',
      `/api/users/${id}`,
    );
    return { message: 'User deleted successfully' };
  }

  @Get('products')
  getAllProducts() {
    return this.apiGatewayService.proxyRequest(
      'products',
      'GET',
      '/api/products',
    );
  }

  @Get('products/:id')
  getProductById(@Param('id') id: string) {
    return this.apiGatewayService.proxyRequest(
      'products',
       'GET',
       `/api/products/${id}`,
    );
  }

  @Post('products')
  createProduct(@Body() product: any) {
    return this.apiGatewayService.proxyRequest(
      'products',
      'POST',
      '/api/products',
      product,
    );
  }

  @Put('products/:id')
  updateProduct(@Param('id') id: string, @Body() product: any) {
    return this.apiGatewayService.proxyRequest(
      'products',
      'PUT',
      `/api/products/${id}`,
      product,
    );
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    await this.apiGatewayService.proxyRequest(
      'products',
      'DELETE',
      `/api/products/${id}`,
    );
    return { message: 'Product deleted successfully' };
  }

  @Get('orders')
  getAllOrders() {
    return this.apiGatewayService.proxyRequest('orders', 'GET', '/api/orders');
  }

  @Get('orders/:id')
  getOrderById(@Param('id') id: string) {
    return this.apiGatewayService.proxyRequest(
      'orders',
      'GET',
      `/api/orders/${id}`,
    );
  }

  @Post('orders')
  createOrder(@Body() order: any) {
    return this.apiGatewayService.proxyRequest(
      'orders',
      'POST',
      '/api/orders',
      order,
    );
  }

  @Put('orders/:id')
  updateOrder(@Param('id') id: string, @Body() order: any) {
    return this.apiGatewayService.proxyRequest(
      'orders',
      'PUT',
      `/api/orders/${id}`,
      order,
    );
  }

  @Delete('orders/:id')
  async deleteOrder(@Param('id') id: string) {
    await this.apiGatewayService.proxyRequest(
      'orders',
      'DELETE',
      `/api/orders/${id}`,
    );
    return { message: 'Order deleted successfully' };
  }
}