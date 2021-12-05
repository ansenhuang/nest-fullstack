import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Field } from './entities/field.entity';
import { CreateFieldDto } from './dto/create-entity.dto';
import { UpdateFieldDto } from './dto/update-entity.dto';

@Injectable()
export class FieldService {
  constructor(
    @InjectModel(Field)
    private readonly fieldModel: typeof Field,
  ) {}

  create(createFieldDto: CreateFieldDto) {
    return this.fieldModel.create(createFieldDto);
  }

  findAll(options: { entityId?: string; page?: string; pageSize?: string } = {}) {
    const entityId = +options.entityId;
    if (!entityId) {
      throw new NotAcceptableException('参数缺少实体ID');
    }
    const limit = +options.pageSize || 20;
    const offset = ((+options.page || 1) - 1) * limit;
    return this.fieldModel.findAndCountAll({
      where: { entityId },
      offset,
      limit,
    });
  }

  findOne(id: number) {
    return this.fieldModel.findByPk(id);
  }

  update(id: number, updateFieldDto: UpdateFieldDto) {
    return this.fieldModel.update(updateFieldDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const field = await this.findOne(id);
    return field.destroy();
  }
}
