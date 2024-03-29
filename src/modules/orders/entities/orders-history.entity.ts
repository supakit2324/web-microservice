import { ApiProperty } from "@nestjs/swagger"
import CategoryEnum from "src/modules/books/enum/category.enum"

export class OrdersHistoryEntity {
    @ApiProperty({
        type: String,
        example: 'bookName'
    })
    bookName: string

    @ApiProperty({
        enum: CategoryEnum,
        example: CategoryEnum.ACTION
    })
    category: CategoryEnum

    @ApiProperty({
        type: Number,
        example: 1
    })
    quantity: string

    @ApiProperty({
        type: Number,
        example: 1
    })
    total: number

    @ApiProperty({
        type: Date,
        example: new Date()
    })
    buyAt: Date
}