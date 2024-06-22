import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { IPaginateOptions } from '../interfaces/paginate-options.interface';
import { PopulateOptions } from 'mongoose';

export class PaginationOptionsDto implements IPaginateOptions {
  constructor(pagination: IPaginateOptions, sorting: object | string) {
    this.page = pagination.page || this.page;
    this.limit = pagination.limit || this.limit;
    this.sort = sorting || this.sort;
  }

  select?: object | string;
  sort?: object | string;
  populate?: PopulateOptions[] | string[] | PopulateOptions | string;
  lean?: boolean = false;
  leanWithId?: boolean = false;

  @Transform((value: any) => parseInt(value, 10))
  @IsOptional()
  limit?: number = 10;

  @Transform((value: any) => parseInt(value, 10))
  @IsOptional()
  page?: number = 1;
}
