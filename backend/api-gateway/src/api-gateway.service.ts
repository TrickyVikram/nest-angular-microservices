import { Injectable } from '@nestjs/common';
import axios, { Method } from 'axios';

@Injectable()
export class ApiGatewayService {
  private readonly userServiceUrl = 'http://localhost:3001';
  private readonly productServiceUrl = 'http://localhost:3002';
  private readonly orderServiceUrl = 'http://localhost:3003';

  async proxyRequest<T = any>(
    service: string,
    method: Method,
    path: string,
    data?: unknown,
  ): Promise<T> {
    try {
      let url: string;

      switch (service) {
        case 'users':
          url = `${this.userServiceUrl}${path}`;
          break;
        case 'products':
          url = `${this.productServiceUrl}${path}`;
          break;
        case 'orders':
          url = `${this.orderServiceUrl}${path}`;
          break;
        default:
          throw new Error('Invalid service');
      }

      const response = await axios.request<T>({
        method,
        url,
        data,
      });

      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';

      throw new Error(`Error calling ${service} service: ${message}`);
    }
  }
}