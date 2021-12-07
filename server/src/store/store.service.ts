import { Injectable } from '@nestjs/common';
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
    // const queryInterface = this.storeModel.sequelize.getQueryInterface();
    // queryInterface.addColumn(this.storeModel.tableName, 'column1', {
    //   type: DataType.JSON,
    // });
  }

  create(createStoreDto: CreateStoreDto) {
    return 'This action adds a new store';
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
