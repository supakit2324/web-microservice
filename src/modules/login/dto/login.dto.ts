import { ApiProperty } from '@nestjs/swagger';

export class AmountLoginDTO {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  amountLogin: number;
}
