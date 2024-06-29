import { IsEnum, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { PaginateQueryOptionsDto } from '../../../common/dtos/paginate-query-options.dto';
import { Transform } from 'class-transformer';
import { SortByEnum } from '../../../common/enums/sort-by.enum';
import { SortDirectionEnum } from '../../../common/enums/sort-direction.enum';

export class FindUsersDto extends PaginateQueryOptionsDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Search Word',
    example: 'John'
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 5
  })
  @Transform((value: any) => parseInt(value, 10))
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
    example: 3
  })
  @Transform((value: any) => parseInt(value, 10))
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    name: 'sortBy',
    required: false,
    type: String,
    enum: ['id', 'createdAt', '...etc'],
    example: 'createdAt',
    description: 'Sorting options as JSON string'
  })
  @IsOptional()
  @IsEnum(SortByEnum)
  sortBy?: SortByEnum = SortByEnum.createdAt;

  @ApiProperty({
    name: 'direction',
    required: false,
    type: String,
    enum: ['ASC', 'DESC'],
    example: 'ASC',
    description: 'Direction options as JSON string'
  })
  @IsOptional()
  @IsEnum(SortDirectionEnum)
  direction?: SortDirectionEnum = SortDirectionEnum.DESC;
}
