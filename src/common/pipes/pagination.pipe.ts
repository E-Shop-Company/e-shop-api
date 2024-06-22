import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { FormattedPaginateQueryOptionsDto } from '../dtos/formatted-paginate-query-options.dto';
import { PaginationOptionsDto } from '../dtos/pagination-options.dto';
import { SortDirectionValue } from '../enums/sort-direction.enum';
import { IPaginateOptions } from '../interfaces/paginate-options.interface';

@Injectable()
export class PaginationPipe
  implements PipeTransform<any, FormattedPaginateQueryOptionsDto>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, _metadata: ArgumentMetadata) {
    const { page, limit, sortBy, direction, ...filter } = value;
    const sort = sortBy || 'createdAt';
    const dir = SortDirectionValue[direction] || 1;
    const sortVal: any = { [sort]: dir };
    const paginateOptions: IPaginateOptions = new PaginationOptionsDto(
      { page: page, limit: limit },
      sortVal,
    );

    paginateOptions.lean = paginateOptions.lean ? paginateOptions.lean : false;

    if (filter.search) {
      filter['$or'] = [
        {
          name: {
            $regex: '^' + filter.search,
            $options: 'i',
          },
        },
        {
          code: {
            $regex: '^' + filter.search,
            $options: 'i',
          },
        },
      ];

      delete filter.search;
    }

    return {
      filter,
      options: paginateOptions,
    } as FormattedPaginateQueryOptionsDto;
  }
}
