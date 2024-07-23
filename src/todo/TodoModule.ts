import { Module } from '@nestjs/common';
import { TaskController } from './controller/TaskController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/Task';
import { TaskList } from './entity/TaskList';
import { TaskService } from './service/TaskService';
import { TaskListController } from './controller/TaskListController';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskList])],
  controllers: [TaskController, TaskListController],
  providers: [TaskService],
  exports: [],
})
export class TodoModule {}
