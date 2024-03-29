import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderBooksValidationPipe } from './pipe/buy-books-validation.pipe';
import { CreateOrderDTO } from './dto/create-order.dto';
import ReqUser from 'src/decorators/req-user.decorator';
import { UsersInterface } from '../users/interfaces/users.interface';
import { BooksStockService } from '../books-stock/books-stock.service';
import UsersOrderHistoryQueryEntity from './entities/users-order-history-query.entity';
import { UsersHistoryQueryDto } from './dto/users-history-query.dto';
import { UseRoles } from 'src/decorators/role.decorator';
import { rolesUserEnum } from '../users/enum/roles-user.enum';
import { JwtRoleGuard } from '../auth/guards/jwt-role.guard';
import { CreateOrderEntity } from './entities/create-order.entity';

@Controller('orders')
@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, JwtRoleGuard)
@UseRoles(rolesUserEnum.USER, rolesUserEnum.ADMIN)
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);
  constructor(
    private readonly ordersService: OrdersService,
    private readonly booksStockService: BooksStockService,
  ) {}

  @Post('buy-book')
  @ApiResponse({
    status: 200,
    type: CreateOrderEntity,
  })
  async buyBook(
    @Body(CreateOrderBooksValidationPipe) body: CreateOrderDTO,
    @ReqUser() user: UsersInterface,
  ): Promise<CreateOrderEntity> {
    const { book, bookStock, quantity } = body;
    try {
      await this.ordersService.createOrder({
        userId: user.userId,
        bookStockId: bookStock.bookId,
        quantity: body.quantity,
        totalPrice: book.price * body.quantity,
      });
    } catch (e) {
      this.logger.error(
        `catch on buyBook-userOrder: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }

    try {
      await this.booksStockService.updateStock(body.bookStock.bookId, {
        quantity: bookStock.quantity - quantity,
        quantityBought: bookStock.quantityBought + quantity,
        totalOrder: bookStock.totalOrder + 1,
      });
    } catch (e) {
      this.logger.error(
        `catch on buy-book: ${e?.message ?? JSON.stringify(e)}`,
      );
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }

    const order = {
      userId: user.userId,
      bookStockId: bookStock.bookId,
      quantity: body.quantity,
      totalPrice: book.price * body.quantity,
    };
    return order;
  }

  @Get('history')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UsersOrderHistoryQueryEntity,
  })
  async getHistoryByOrder(
    @ReqUser() user: UsersInterface,
    @Query() query: UsersHistoryQueryDto,
  ): Promise<UsersOrderHistoryQueryEntity> {
    try {
      return this.ordersService.getHistoryByOrder(user.userId, query);
    } catch (e) {
      this.logger.error(`catch on history: ${e?.message ?? JSON.stringify(e)}`);
      throw new InternalServerErrorException({
        message: e?.message ?? e,
      });
    }
  }
}
