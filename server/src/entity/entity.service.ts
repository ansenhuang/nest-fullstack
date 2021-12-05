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

  create(createEntityDto: CreateEntityDto) {
    return this.entityModel.create(createEntityDto);
  }

  findAll(options: { page?: string; pageSize?: string } = {}) {
    const limit = +options.pageSize || 20;
    const offset = ((+options.page || 1) - 1) * limit;
    return this.entityModel.findAndCountAll({
      offset,
      limit,
    });
  }

  findOne(id: number) {
    return this.entityModel.findByPk(id);
  }

  update(id: number, updateEntityDto: UpdateEntityDto) {
    return this.entityModel.update(updateEntityDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    return entity.destroy();
  }
}
