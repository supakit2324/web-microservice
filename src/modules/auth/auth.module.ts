import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtStrategy } from './guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RMQService } from 'src/constants';
import { LoginService } from '../login/login.service';
import RegisterCacheOptions from 'src/cache.providers';
import { ConfigModule } from '@nestjs/config';
import { MakeRMQServiceProvider } from 'src/microservice.providers';

@Module({
  imports: [
    JwtModule,
    PassportModule,
    ConfigModule.forRoot(),
    CacheModule.registerAsync(RegisterCacheOptions),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.USERS)
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LoginService],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
