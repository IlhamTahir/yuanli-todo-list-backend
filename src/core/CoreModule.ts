import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';
import { UserService } from './service/UserService';
import { UserController } from './controller/UserController';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './service/TypeOrmConfigService';
import database from './config/database';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class CoreModule {}
