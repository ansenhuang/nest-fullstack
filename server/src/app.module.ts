import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './config';
import { UserModule } from './user/user.module';
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
      sync: {
        alter: { drop: false },
      },
      ...config.db,
    }),
    // api
    UserModule,
    EntityModule,
    FieldModule,
    StoreModule,
  ],
})
export class AppModule {}
