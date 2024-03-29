import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AMOUNT_LOGIN_CMD, RMQService } from 'src/constants';
import { Observable } from 'rxjs';
import { AmountLoginDTO } from './dto/login.dto';

@Injectable()
export class LoginService {
  @Inject(RMQService.USERS) private readonly loginServiceRMQ: ClientProxy;

  updateAmountLogin(payload: AmountLoginDTO): Observable<AmountLoginDTO> {
    return this.loginServiceRMQ.emit(
      {
        cmd: AMOUNT_LOGIN_CMD,
        method: 'update-amount-login',
      },
      payload,
    );
  }
}
