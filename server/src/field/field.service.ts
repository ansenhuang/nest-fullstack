import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Field } from './entities/field.entity';
import { Entity } from '../entity/entities/entity.entity';
import { CreateFieldDto } from './dto/create-entity.dto';
import { UpdateFieldDto } from './dto/update-entity.dto';

@Injectable()
export class FieldService {
  constructor(
    @InjectModel(Field)
    private readonly fieldModel: typeof Field,
    @InjectModel(Entity)
    private readonly entityModel: typeof Entity,
  ) {}

  async create(createFieldDto: CreateFieldDto) {
    const { entityId } = createFieldDto;
    const entity = await this.entityModel.findByPk(entityId, {
      attributes: ['fieldCount'],
    });
    const nextFieldCount = (entity.fieldCount || 0) + 1;
    await this.entityModel.update(
      { fieldCount: nextFieldCount },
      {
        where: {
          id: entityId,
        },
      },
    );
    return this.fieldModel.create({ ...createFieldDto, columnName: `column_${nextFieldCount}` });
  }

  findAll(options: { entityId?: string; page?: string; pageSize?: string } = {}) {
    const entityId = +options.entityId;
    if (!entityId) {
      throw new NotAcceptableException('参数缺少实体ID');
    }
    const limit = +options.pageSize || 100;
    const offset = ((+options.page || 1) - 1) * limit;
    return this.fieldModel.findAndCountAll({
      where: { entityId },
      offset,
      limit,
      attributes: {
        exclude: ['deletedAt', 'columnName'],
      },
    });
  }

  findOne(id: number) {
    return this.fieldModel.findByPk(id, {
      attributes: {
        exclude: ['deletedAt', 'columnName'],
      },
    });
  }

  update(id: number, updateFieldDto: UpdateFieldDto) {
    // columnName不可修改
    const { columnName, ...restFieldDto } = updateFieldDto;
    return this.fieldModel.update(restFieldDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const field = await this.findOne(id);
    return field.destroy();
  }
}
