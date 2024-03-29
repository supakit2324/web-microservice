import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQService, USER_CMD } from 'src/constants';
import { CreateUserDto } from './dto/create-users.dto';
import { Observable } from 'rxjs';
import { ChangePasswordEntity } from './entities/change-password.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersInterface } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  @Inject(RMQService.USERS) private readonly usersServiceQmq: ClientProxy;

  registerUser(body: CreateUserDto): Observable<CreateUserDto> {
    return this.usersServiceQmq.emit(
      {
        cmd: USER_CMD,
        method: 'register',
      },
      body,
    );
  }

  changePasswordUser(
    userId: string,
    hashPassword: string,
  ): Observable<ChangePasswordEntity> {
    return this.usersServiceQmq.emit(
      {
        cmd: USER_CMD,
        method: 'changePassword',
      },
      {
        userId,
        hashPassword,
      },
    );
  }

  updateUser(userId: string, update: UpdateUserDto): Observable<UsersInterface> {
    return this.usersServiceQmq.emit(
      {
        cmd: USER_CMD,
        method: 'updateUser',
      },
      {
        userId,
        update,
      },
    );
  }
}
