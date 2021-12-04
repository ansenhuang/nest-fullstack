import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: config.staticPath,
      exclude: ['/api*'],
    }),
    SequelizeModule.forRoot({
      autoLoadModels: true,
      synchronize: true,
      ...config.db,
    }),
    // api
    UsersModule,
  ],
})
export class AppModule {}
