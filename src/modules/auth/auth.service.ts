import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQService, USER_CMD } from 'src/constants';
import { LoginUserDto } from './dto/user-login.dto';
import { lastValueFrom } from 'rxjs';
import { UsersInterface } from '../users/interfaces/users.interface';
import { UsersLoginEntity } from './entities/user-login-entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  @Inject(RMQService.USERS) private readonly usersServiceQmq: ClientProxy;

  async loginUser(email: string, password: string): Promise<UsersLoginEntity> {
    const body: LoginUserDto = { email, password };
    return lastValueFrom(
      this.usersServiceQmq.send(
        {
          cmd: USER_CMD,
          method: 'login',
        },
        body,
      ),
    );
  }

  async getByUserId(userId: string): Promise<UsersInterface> {
    return lastValueFrom(
      this.usersServiceQmq.send(
        {
          cmd: USER_CMD,
          method: 'getByUserId',
        },
        userId,
      ),
    );
  }

  async getByEmail(email: string): Promise<UsersInterface> {
    return lastValueFrom(
      this.usersServiceQmq.send(
        {
          cmd: USER_CMD,
          method: 'getByEmail',
        },
        email,
      ),
    );
  }

  async getByUsername(username: string): Promise<UsersInterface> {
    return lastValueFrom(
      this.usersServiceQmq.send(
        {
          cmd: USER_CMD,
          method: 'getByUsername',
        },
        username,
      ),
    );
  }

  async getBlockUser(email: string): Promise<UsersInterface> {
    return lastValueFrom(
      this.usersServiceQmq.send(
        {
          cmd: USER_CMD,
          method: 'getBlockUser',
        },
        email,
      ),
    );
  }
}
