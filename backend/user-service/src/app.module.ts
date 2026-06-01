import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('USER_DB_HOST'),
        port: config.get<number>('USER_DB_PORT'),
        username: config.get<string>('USER_DB_USERNAME'),
        password: config.get<string>('USER_DB_PASSWORD'),
        database: config.get<string>('USER_DB_NAME'),
        entities: [User],
        synchronize: true,
      }),
    }),

    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}