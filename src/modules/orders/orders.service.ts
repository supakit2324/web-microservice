import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ORDERS_CMD, RMQService } from 'src/constants';
import { Observable, lastValueFrom } from 'rxjs';
import { OrdersInterface } from './interfaces/orders.interface';
import { UsersHistoryQueryDto } from './dto/users-history-query.dto';
import UsersOrderHistoryQueryEntity from './entities/users-order-history-query.entity';

@Injectable()
export class OrdersService {
  @Inject(RMQService.BOOKS) private readonly ordersServiceRMQ: ClientProxy;

  createOrder(body: OrdersInterface): Observable<OrdersInterface> {
    return this.ordersServiceRMQ.emit(
      {
        cmd: ORDERS_CMD,
        method: 'create-order',
      },
      body,
    );
  }

  getHistoryByOrder(
    userId: string,
    query: UsersHistoryQueryDto,
  ): Promise<UsersOrderHistoryQueryEntity> {
    return lastValueFrom(
      this.ordersServiceRMQ.send(
        {
          cmd: ORDERS_CMD,
          method: 'get-history-by-order',
        },
        {
          userId,
          body: query,
        },
      ),
    );
  }
}
