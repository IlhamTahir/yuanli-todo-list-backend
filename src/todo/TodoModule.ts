import { Module } from '@nestjs/common';
import { TaskController } from './controller/TaskController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/Task';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [],
  exports: [],
})
export class TodoModule {}
