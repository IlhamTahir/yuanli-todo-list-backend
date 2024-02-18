import { Module } from '@nestjs/common';
import { TaskController } from './controller/TaskController';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [],
  exports: [],
})
export class TodoModule {}
