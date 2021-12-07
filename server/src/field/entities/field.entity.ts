import {
  Column,
  Model,
  Table,
  Comment,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Entity } from '../../entity/entities/entity.entity';

@Table({
  paranoid: true,
})
export class Field extends Model {
  @Comment('字段名称')
  @AllowNull(false)
  @Column
  label: string;

  @Comment('字段描述')
  @Column(DataType.TEXT)
  description: string;

  @Comment('字段唯一标识')
  @AllowNull(false)
  @Column
  name: string;

  @Comment('宽表的字段别名')
  @AllowNull(false)
  @Column
  columnName: string;

  @Comment('字段类型')
  @AllowNull(false)
  @Column
  type: string;

  @Comment('关联的实体ID')
  @ForeignKey(() => Entity)
  @AllowNull(false)
  @Column
  entityId: number;

  @BelongsTo(() => Entity)
  entity: Entity;
}
