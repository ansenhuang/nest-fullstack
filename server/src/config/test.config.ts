import { SequelizeModuleOptions } from '@nestjs/sequelize';

const db: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456@Qwe',
  database: 'nest_app',
};

export default {
  db,
};
