import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DataType } from 'sequelize-typescript';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store)
    private readonly storeModel: typeof Store,
  ) {
    const { tableName, sequelize } = this.storeModel;
    if (sequelize) {
      const queryInterface = sequelize.getQueryInterface();
      // 动态添加字段，不够再加
      Array.from({ length: 30 }).forEach(async (_, index) => {
        try {
          await queryInterface.addColumn(
            tableName,
            `column_${index + 1}`,
            {
              type: DataType.JSON,
            },
            { logging: false },
          );
        } catch (error) {}
      });
    }
  }

  create(createStoreDto: CreateStoreDto) {
    return this.storeModel.create(createStoreDto);
  }

  findAll(options: { entityId?: string; page?: string; pageSize?: string } = {}) {
    const entityId = +options.entityId;
    if (!entityId) {
      throw new NotAcceptableException('参数缺少实体ID');
    }
    const limit = +options.pageSize || 20;
    const offset = ((+options.page || 1) - 1) * limit;
    return this.storeModel.findAndCountAll({
      where: { entityId },
      offset,
      limit,
    });
  }

  findOne(id: number) {
    return this.storeModel.findByPk(id);
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return this.storeModel.update(updateStoreDto, {
      where: { id },
    });
  }

  async remove(id: number) {
    const store = await this.findOne(id);
    return store.destroy();
  }
}
