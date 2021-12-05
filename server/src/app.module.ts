import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './config';
import { EntityModule } from './entity/entity.module';
import { FieldModule } from './field/field.module';

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
    EntityModule,
    FieldModule,
  ],
})
export class AppModule {}
