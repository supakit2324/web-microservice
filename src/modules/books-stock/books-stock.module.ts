import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { RMQService } from 'src/constants';
import { BooksStockService } from './books-stock.service';
import { BooksStockController } from './books-stock.controller';
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
    ]),
  ],
  controllers: [BooksStockController],
  providers: [BooksStockService],
  exports: [BooksStockService],
})
export class BooksStockModule {}
