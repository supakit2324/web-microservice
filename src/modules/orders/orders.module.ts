import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { RMQService } from 'src/constants';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { BooksStockService } from '../books-stock/books-stock.service';
import { BooksService } from '../books/books.service';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.register(),
    ClientsModule.register([
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
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, BooksStockService, BooksService],
})
export class OrdersModule {}
