import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersController } from './users.controllor';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/guards/jwt.strategy';
import { RMQService } from 'src/constants';
import { CacheModule } from '@nestjs/cache-manager';
import RegisterCacheOptions from 'src/cache.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.registerAsync(RegisterCacheOptions),
    ClientsModule.register([
      {
        name: RMQService.USERS,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ],
          noAck: true,
          queue: RMQService.USERS,
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: RMQService.BOOKS,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ],
          noAck: true,
          queue: RMQService.BOOKS,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy],
  exports: [UsersService, AuthService, JwtStrategy],
})
export class UsersModule {}
