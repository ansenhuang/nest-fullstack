import {
  Column,
  Model,
  Table,
  Comment,
  AllowNull,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Entity } from '../../entity/entities/entity.entity';

@Table({
  paranoid: true,
})
export class Store extends Model {
  static initialize(attributes, options) {
    this.isInitialized = true;

    const columnAttributes = Array.from<undefined>({ length: 20 }).reduce((map, _, index) => {
      map[`column_${index + 1}`] = {
        type: DataType.JSON,
      };
      return map;
    }, {} as Record<string, any>);

    // @ts-ignore
    return super.init({ ...attributes, ...columnAttributes }, options) as any;
  }

  @Comment('关联的实体ID')
  @ForeignKey(() => Entity)
  @AllowNull(false)
  @Column
  entityId: number;

  @BelongsTo(() => Entity)
  entity: Entity;
}
