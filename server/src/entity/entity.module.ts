import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { Entity } from './entities/entity.entity';

@Module({
  imports: [SequelizeModule.forFeature([Entity])],
  controllers: [EntityController],
  providers: [EntityService],
})
export class EntityModule {}
