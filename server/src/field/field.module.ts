import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { Field } from './entities/field.entity';

@Module({
  imports: [SequelizeModule.forFeature([Field])],
  controllers: [FieldController],
  providers: [FieldService],
})
export class FieldModule {}
