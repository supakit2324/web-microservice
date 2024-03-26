import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderEntity {
    @ApiProperty({
        type: String,
        example: 'userId'
    })
    userId: string;

    @ApiProperty({
        type: String,
        example: 'bookStockId'
    })
    bookStockId: string;

    @ApiProperty({
        type: Number,
        example: 'quantity'
    })
    quantity: number;

    @ApiProperty({
        type: Number,
        example: 'totalPrice'
    })
    totalPrice: number;
}