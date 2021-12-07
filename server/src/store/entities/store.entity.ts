import {
  Column,
  Model,
  Table,
  Comment,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Entity } from '../../entity/entities/entity.entity';

@Table({
  paranoid: true,
})
export class Store extends Model {
  @Comment('关联的实体ID')
  @ForeignKey(() => Entity)
  @AllowNull(false)
  @Column
  entityId: number;

  @BelongsTo(() => Entity)
  entity: Entity;
}
