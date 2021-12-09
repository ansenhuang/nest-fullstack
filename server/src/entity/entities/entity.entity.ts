import {
  Column,
  Model,
  Table,
  Comment,
  DataType,
  Unique,
  AllowNull,
  HasMany,
  Default,
} from 'sequelize-typescript';
import { Field } from '../../field/entities/field.entity';
import { Store } from '../../store/entities/store.entity';

@Table({
  paranoid: true,
})
export class Entity extends Model {
  @Comment('实体名称')
  @AllowNull(false)
  @Column
  label: string;

  @Comment('实体描述')
  @Column(DataType.TEXT)
  description: string;

  @Comment('实体唯一标识')
  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @Comment('累计字段的数量')
  @Default(0)
  @Column
  fieldCount: number;

  @HasMany(() => Field)
  fields: Field[];

  @HasMany(() => Store)
  stores: Store[];
}
