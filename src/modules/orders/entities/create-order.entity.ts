import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderEntity {
  @ApiProperty({
    type: String,
    example: 'userId',
  })
  userId: string;

  @ApiProperty({
    type: String,
    example: 'bookStockId',
  })
  bookStockId: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  quantity: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  totalPrice: number;
}
