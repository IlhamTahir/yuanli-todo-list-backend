import { Module } from '@nestjs/common';
import { CoreModule } from './core/CoreModule';
import { TodoModule } from './todo/TodoModule';

@Module({
  imports: [CoreModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
