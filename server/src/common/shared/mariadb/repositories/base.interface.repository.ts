import { DeepPartial, FindManyOptions, FindOneOptions, SelectQueryBuilder } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T>[]): T[];
  save(data: DeepPartial<T>): Promise<T>;
  saveMany(data: DeepPartial<T>[]): Promise<T[]>;
  findOneById(id: number): Promise<T>;
  findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  remove(data: T): Promise<T>;
  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;
  preload(entityLike: DeepPartial<T>): Promise<T>;
  createQueryBuilder(alias: string): SelectQueryBuilder<T>;
  removeMany(entities: T[]): Promise<T[]>;
  count(options?: FindManyOptions<T>): Promise<number>;
  findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]>;
};
