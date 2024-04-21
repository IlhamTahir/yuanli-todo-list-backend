import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import database from '../config/database';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(database.KEY)
    private dbConfig: ConfigType<typeof database>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.dbConfig.host,
      port: this.dbConfig.port,
      username: this.dbConfig.username,
      password: this.dbConfig.password,
      database: this.dbConfig.database,
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
