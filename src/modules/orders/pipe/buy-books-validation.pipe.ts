import {
  BadRequestException,
  Inject,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { BooksStockService } from 'src/modules/books-stock/books-stock.service';
import { CreateOrderDTO } from '../../orders/dto/create-order.dto';
import { BooksStockInterface } from 'src/modules/books-stock/interfaces/books-stock.interface';
import { BooksInterface } from 'src/modules/books/interfaces/books.interface';
import { BooksService } from 'src/modules/books/books.service';

export class CreateOrderBooksValidationPipe implements PipeTransform {
  private readonly logger = new Logger(CreateOrderBooksValidationPipe.name);

  constructor(
    @Inject(BooksService) private readonly booksService: BooksService,
    @Inject(BooksStockService)
    private readonly booksStockService: BooksStockService,
  ) {}

  async transform(body: CreateOrderDTO): Promise<CreateOrderDTO> {
    let bookStock: BooksStockInterface;
    let book: BooksInterface;
    try {
      bookStock = await this.booksStockService.getBookStockById(body.bookId);
    } catch (e) {
      this.logger.error(`catch on books: ${e?.message ?? JSON.stringify(e)}`);
      throw new BadRequestException({
        message: `${e?.message ?? e}`,
      });
    }

    if (!bookStock) {
      this.logger.error(`catch on books ${body.bookId} not found`);
      throw new BadRequestException({
        message: `${body.bookId} not found`,
      });
    }

    try {
      book = await this.booksService.getBookById(body.bookId);
    } catch (e) {
      this.logger.error(`catch on books: ${e?.message ?? JSON.stringify(e)}`);
      throw new BadRequestException({
        message: `${e?.message ?? e}`,
      });
    }

    if (!book) {
      this.logger.error(`catch on books ${body.bookId} not found`);
      throw new BadRequestException({
        message: `${body.bookId} not found`,
      });
    }

    if (bookStock.quantity < 1) {
      this.logger.error(`catch on books: ${bookStock.bookName} sold out`);
      throw new BadRequestException({
        message: `${bookStock.bookName} sold out`,
      });
    }
    if (bookStock.quantity < body.quantity) {
      this.logger.error(`catch on books: ${bookStock.bookName} not enough`);
      throw new BadRequestException({
        message: `${bookStock.bookName} not enough`,
      });
    }

    body.bookStock = bookStock;
    body.book = book;
    return body;
  }
}
