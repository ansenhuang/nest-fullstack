import { Table, Model, Column, BeforeCreate } from 'sequelize-typescript';

@Table({
  paranoid: true,
})
export class User extends Model {
  @Column({
    comment: '用户名',
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    comment: '昵称',
  })
  nickname: string;

  @Column({
    comment: '密码',
    allowNull: false,
  })
  password: string;

  @Column({
    comment: '用户头像',
  })
  avatar: string;

  @Column
  email: string;

  @Column({
    comment: '用户角色', // 1=超级管理员，2=管理员，3=普通用户
  })
  role: number;
}
