import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import {
  throttlerAsyncOptions,
  throttlerServiceProvider,
} from 'src/throttler.providers';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import RegisterCacheOptions from 'src/cache.providers';
import { BooksModule } from '../books/books.module';
import { BooksStockModule } from '../books-stock/books-stock.module';
import { OrdersModule } from '../orders/orders.module';
import { LoginModule } from '../login/login.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CacheModule.registerAsync(RegisterCacheOptions),
    ThrottlerModule.forRootAsync(throttlerAsyncOptions),
    AuthModule,
    UsersModule,
    BooksModule,
    BooksStockModule,
    OrdersModule,
    LoginModule,
  ],
  providers: [throttlerServiceProvider],
})
export class AppModule {}
