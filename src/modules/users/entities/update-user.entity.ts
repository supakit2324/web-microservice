import { ApiProperty } from '@nestjs/swagger';

export class updateUserEntity {
  @ApiProperty({
    example: 'firstname',
    type: String,
  })
  firstname: string;

  @ApiProperty({
    example: 'lastname',
    type: String,
  })
  lastname: string;
}
