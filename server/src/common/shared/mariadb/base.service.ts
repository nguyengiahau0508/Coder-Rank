import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { BaseInterfaceRepository } from './repositories/base.interface.repository';
import { RpcException } from '@nestjs/microservices';
import { PageOptionsDto } from '../pagination/dtos';
import { PageDto } from '../pagination/page.dto';
import { PageMetaDto } from '../pagination/page-meta.dto';

export abstract class BaseService<T> {
  constructor(protected readonly repository: BaseInterfaceRepository<T>) { }

  create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  createMany(data: DeepPartial<T>[]): T[] {
    return this.repository.createMany(data);
  }

  save(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data);
  }

  saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.saveMany(data);
  }

  findOneById(id: any): Promise<T> {
    return this.repository.findOneById(id);
  }

  findByCondition(filterCondition: FindOneOptions<T>): Promise<T> {
    return this.repository.findByCondition(filterCondition);
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.findAll(options);
  }

  findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return this.repository.findWithRelations(relations);
  }

  remove(data: T): Promise<T> {
    return this.repository.remove(data);
  }

  preload(entityLike: DeepPartial<T>): Promise<T> {
    return this.repository.preload(entityLike);
  }

  async count(options?: FindManyOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  async getAll(
    pageOptionsDto: PageOptionsDto,
    options: FindManyOptions<T> = {},
  ): Promise<PageDto<T>> {

    const [data, itemCount] = await this.repository.findAndCount({
      ...options,
      skip: pageOptionsDto.take * (pageOptionsDto.page - 1) || 0,
      take: pageOptionsDto.take || 10,
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(data, pageMetaDto);
  }


  async update(id: number, dto: DeepPartial<T>) {
    const existingEntity = await this.repository.findOneById(id);

    if (!existingEntity) {
      throw new RpcException(`Entity with ID ${id} not found`);
    }

    Object.assign(existingEntity, dto);

    return this.repository.save(existingEntity);
  }

}

