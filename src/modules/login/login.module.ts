import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQService } from 'src/constants';
import { LoginService } from './login.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    ]),
  ],
  providers: [LoginService],
})
export class LoginModule {}
