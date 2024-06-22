import { IPaginatedInterface } from '../interfaces/paginate-result.interface';

export class PaginatedResponseDto<Model> implements IPaginatedInterface<Model> {
  docs: Model[];
  total: number;
  limit: number;
  page?: number;
  pages?: number;
  offset?: number;
}
