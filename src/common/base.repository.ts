import { Injectable } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  PaginateModel,
  Types,
  UpdateQuery,
} from 'mongoose';
import { IBaseRepository } from './interfaces/base-repository.interface';
import { IPaginateOptions } from './interfaces/paginate-options.interface';
import { IPaginatedInterface } from './interfaces/paginate-result.interface';

@Injectable()
export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected readonly model: PaginateModel<T>) {}

  async create(doc: Partial<T>): Promise<T> {
    return this.model.create(doc);
  }

  async save(doc: Partial<T>): Promise<T> {
    const createdModel = new this.model(doc);
    return createdModel.save() as any;
  }

  async findById(id: string | Types.ObjectId): Promise<T> {
    return this.model.findById(id);
  }

  findOne(filter: FilterQuery<T>): Promise<T> {
    return this.model.findOne(filter);
  }

  find(
    filter: FilterQuery<T>,
    projection: any = null,
    sort: any = { _id: -1 },
  ): Promise<T[]> {
    return this.model.find(filter, projection).sort(sort);
  }

  updateById(id: string | Types.ObjectId, update: UpdateQuery<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, update, {
      new: true,
      useFindAndModify: true,
    });
  }

  updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T> {
    return this.model.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: true,
    });
  }

  updateMany(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<any> {
    return this.model.updateMany(filter, update, { new: true });
  }

  deleteById(id: string | Types.ObjectId): Promise<T> {
    return this.model.findByIdAndDelete(id, { useFindAndModify: false });
  }

  deleteOne(filter: FilterQuery<T>): Promise<T> {
    return this.model.findByIdAndDelete(filter, { useFindAndModify: false });
  }

  deleteMany(filter: FilterQuery<T>): Promise<any> {
    return this.model.deleteMany(filter);
  }

  async paginate(
    filter: object,
    paginateOptions: IPaginateOptions,
  ): Promise<IPaginatedInterface<T>> {
    const paginatedResult = await this.model.paginate(filter, paginateOptions);

    return {
      docs: paginatedResult.docs,
      total: paginatedResult.totalDocs,
      limit: paginatedResult.limit,
      page: paginatedResult.page,
      pages: paginatedResult.totalPages,
    };
  }

  async aggregate(pipeline: any[]): Promise<any> {
    return this.model.aggregate(pipeline);
  }
}
