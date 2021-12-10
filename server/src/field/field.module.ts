import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { Field } from './entities/field.entity';
import { Entity } from '../entity/entities/entity.entity';

@Module({
  imports: [SequelizeModule.forFeature([Field, Entity])],
  controllers: [FieldController],
  providers: [FieldService],
})
export class FieldModule {}
