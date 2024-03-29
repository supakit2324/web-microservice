import { ApiProperty } from '@nestjs/swagger';
import { OrdersHistoryEntity } from './orders-history.entity';

class UsersOrderHistoryQueryEntity {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  page: number;

  @ApiProperty({
    type: Number,
    example: 20,
  })
  perPage: number;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  count: number;

  @ApiProperty({
    type: [OrdersHistoryEntity],
  })
  records: [OrdersHistoryEntity];
}

export default UsersOrderHistoryQueryEntity;
