import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Store } from './entities/store.entity';
import { Field } from '../field/entities/field.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store)
    private readonly storeModel: typeof Store,
    @InjectModel(Field)
    private readonly fieldModel: typeof Field,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    const { entityId, ...restValues } = createStoreDto;
    if (!entityId) {
      throw new NotAcceptableException('参数缺少实体ID');
    }

    const fields = await this.findFields(entityId);
    const columnValues = fields.reduce((values, field) => {
      values[field.columnName] = restValues[field.name];
      return values;
    }, {} as Record<string, any>);

    const store = await this.storeModel.create({ entityId, ...columnValues });
    const resStore = { ...store.get() };
    fields.forEach((field) => {
      resStore[field.name] = resStore[field.columnName];
      delete resStore[field.columnName];
    });
    return resStore;
  }

  async findAll(options: { entityId?: string; page?: string; pageSize?: string } = {}) {
    const entityId = +options.entityId;
    if (!entityId) {
      throw new NotAcceptableException('参数缺少实体ID');
    }
    const limit = +options.pageSize || 20;
    const offset = ((+options.page || 1) - 1) * limit;

    const fields = await this.findFields(entityId);
    const fieldAlias = fields.map((field) => [field.columnName, field.name] as [string, string]);
    const attributes = ['id', 'entityId', 'createdAt', 'updatedAt', ...fieldAlias];

    return this.storeModel.findAndCountAll({
      where: { entityId },
      offset,
      limit,
      attributes,
    });
  }

  async findOne(id: number) {
    const store = await this.storeModel.findByPk(id, {
      attributes: {
        exclude: ['deletedAt'],
      },
    });
    const fields = await this.findFields(store.entityId);
    const resStore = Object.entries(store.get()).reduce((map, [k, v]) => {
      if (k.startsWith('column')) {
        const targetField = fields.find((field) => field.columnName === k);
        if (targetField) {
          map[targetField.name] = v;
        }
      } else {
        map[k] = v;
      }
      return map;
    }, {} as Record<string, any>);
    return resStore;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const { entityId, ...restValues } = updateStoreDto;
    if (!entityId) {
      throw new NotAcceptableException('参数缺少实体ID');
    }

    const fields = await this.findFields(entityId);
    const columnValues = fields.reduce((values, field) => {
      values[field.columnName] = restValues[field.name];
      return values;
    }, {} as Record<string, any>);

    return this.storeModel.update(
      { entityId, ...columnValues },
      {
        where: { id },
      },
    );
  }

  async remove(id: number) {
    const store = await this.storeModel.findByPk(id, {
      attributes: ['id'],
    });
    return store.destroy();
  }

  findFields(entityId: number) {
    return this.fieldModel.findAll({
      where: { entityId },
      attributes: ['name', 'columnName'],
    });
  }
}
