import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RMQService } from 'src/constants';
import { LoginService } from './login.service';
import { ConfigModule } from '@nestjs/config';
import { MakeRMQServiceProvider } from 'src/microservice.providers';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      MakeRMQServiceProvider(RMQService.USERS)
    ]),
  ],
  providers: [LoginService],
})
export class LoginModule {}
