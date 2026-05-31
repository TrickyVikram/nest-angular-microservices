import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { Response } from 'express';

@Controller('api')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  // User Service Routes
  @Get('users')
  async getAllUsers(@Res() res: Response) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'users',
        'GET',
        '/api/users',
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Get('users/:id')
  async getUserById(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'users',
        'GET',
        `/api/users/${id}`,
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Post('users')
  async createUser(@Body() user: any, @Res() res: Response) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'users',
        'POST',
        '/api/users',
        user,
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Put('users/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: any,
    @Res() res: Response,
  ) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'users',
        'PUT',
        `/api/users/${id}`,
        user,
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.apiGatewayService.proxyRequest(
        'users',
        'DELETE',
        `/api/users/${id}`,
      );
      return res.json({ message: 'User deleted' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Product Service Routes
  @Get('products')
  async getAllProducts(@Res() res: Response) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'products',
        'GET',
        '/api/products',
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Get('products/:id')
  async getProductById(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'products',
        'GET',
        `/api/products/${id}`,
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Post('products')
  async createProduct(@Body() product: any, @Res() res: Response) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'products',
        'POST',
        '/api/products',
        product,
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Put('products/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() product: any,
    @Res() res: Response,
  ) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'products',
        'PUT',
        `/api/products/${id}`,
        product,
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.apiGatewayService.proxyRequest(
        'products',
        'DELETE',
        `/api/products/${id}`,
      );
      return res.json({ message: 'Product deleted' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Order Service Routes
  @Get('orders')
  async getAllOrders(@Res() res: Response) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'orders',
        'GET',
        '/api/orders',
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Get('orders/:id')
  async getOrderById(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'orders',
        'GET',
        `/api/orders/${id}`,
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Post('orders')
  async createOrder(@Body() order: any, @Res() res: Response) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'orders',
        'POST',
        '/api/orders',
        order,
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Put('orders/:id')
  async updateOrder(
    @Param('id') id: number,
    @Body() order: any,
    @Res() res: Response,
  ) {
    try {
      const data = await this.apiGatewayService.proxyRequest(
        'orders',
        'PUT',
        `/api/orders/${id}`,
        order,
      );
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Delete('orders/:id')
  async deleteOrder(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.apiGatewayService.proxyRequest(
        'orders',
        'DELETE',
        `/api/orders/${id}`,
      );
      return res.json({ message: 'Order deleted' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
