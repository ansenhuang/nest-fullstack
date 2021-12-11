import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Entity } from './entities/entity.entity';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Injectable()
export class EntityService {
  constructor(
    @InjectModel(Entity)
    private readonly entityModel: typeof Entity,
  ) {}

  async create(createEntityDto: CreateEntityDto) {
    const { fieldCount, ...restValues } = createEntityDto;
    const entity = await this.entityModel.create(restValues);
    const resEntity = entity.get();
    delete resEntity.fieldCount;
    return resEntity;
  }

  findAll(options: { page?: string; pageSize?: string } = {}) {
    const limit = +options.pageSize || 20;
    const offset = ((+options.page || 1) - 1) * limit;
    return this.entityModel.findAndCountAll({
      offset,
      limit,
      attributes: {
        exclude: ['deletedAt', 'fieldCount'],
      },
    });
  }

  findOne(id: number) {
    return this.entityModel.findByPk(id, {
      attributes: {
        exclude: ['deletedAt', 'fieldCount'],
      },
    });
  }

  update(id: number, updateEntityDto: UpdateEntityDto) {
    const { fieldCount, ...restValues } = updateEntityDto;
    return this.entityModel.update(restValues, {
      where: { id },
    });
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    return entity.destroy();
  }
}
