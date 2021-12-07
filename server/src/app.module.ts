import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './config';
import { EntityModule } from './entity/entity.module';
import { FieldModule } from './field/field.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: config.staticPath,
      exclude: ['/api*'],
    }),
    SequelizeModule.forRoot({
      autoLoadModels: true,
      synchronize: true,
      sync: { alter: true },
      ...config.db,
    }),
    // api
    EntityModule,
    FieldModule,
    StoreModule,
  ],
})
export class AppModule {}
