import { ESortBooksQuery } from 'src/modules/books/dto/books-query.dto';
import CategoryEnum from './enum/category.enum';

export class BooksCategoryUtil {
  static categoryMap: Record<string, CategoryEnum> = {
    [CategoryEnum.ALL]: CategoryEnum.ALL,
    [CategoryEnum.ACTION]: CategoryEnum.ACTION,
    [CategoryEnum.ADVENTURE]: CategoryEnum.ADVENTURE,
    [CategoryEnum.BUSINESS]: CategoryEnum.BUSINESS,
    [CategoryEnum.COMEDY]: CategoryEnum.COMEDY,
    [CategoryEnum.CRAFTS]: CategoryEnum.CRAFTS,
    [CategoryEnum.CRIME]: CategoryEnum.CRIME,
    [CategoryEnum.DRAMA]: CategoryEnum.DRAMA,
    [CategoryEnum.GUIDE]: CategoryEnum.GUIDE,
    [CategoryEnum.HEALING]: CategoryEnum.HEALING,
    [CategoryEnum.HUMOR]: CategoryEnum.HUMOR,
    [CategoryEnum.JOURNAL]: CategoryEnum.JOURNAL,
    [CategoryEnum.MUSIC]: CategoryEnum.MUSIC,
    [CategoryEnum.ROMANTIC]: CategoryEnum.ROMANTIC,
    [CategoryEnum.SPORTS]: CategoryEnum.SPORTS,
    [CategoryEnum.TRAVEL]: CategoryEnum.TRAVEL,
  };

  static getQueryByCategory(key: string, query?: Record<string, any>) {
    const category = this.categoryMap[key];
    if (category && category !== CategoryEnum.ALL) {
      return { ...query, category };
    }
    return { ...query };
  }

  static sort(key: string) {
    const sortMap: Record<string, Record<string, string>> = {
      [ESortBooksQuery.PRICE_DESC]: { price: 'desc' },
      [ESortBooksQuery.PRICE_ASC]: { price: 'asc' },
      [ESortBooksQuery.QUANTITY_ASC]: { quantity: 'asc' },
      [ESortBooksQuery.QUANTITY_DESC]: { quantity: 'desc' },
    };

    return sortMap[key];
  }
}
