import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store } from './entities/store.entity';
import { Field } from '../field/entities/field.entity';

@Module({
  imports: [SequelizeModule.forFeature([Store, Field])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
