import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';
import { UserService } from './service/UserService';
import { UserController } from './controller/UserController';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './service/TypeOrmConfigService';
import database from './config/database';
import { Role } from './entity/Role';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './pipe/ValidationPipe';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './controller/TokenController';
import { AuthService } from './service/AuthService';
import { SECRET_KEY } from './constant/user';
import { AuthGuard } from './guard/AuthGuard';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([User, Role]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
    }),
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [UserController, TokenController],
  providers: [
    UserService,
    AuthService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [],
})
export class CoreModule {}
