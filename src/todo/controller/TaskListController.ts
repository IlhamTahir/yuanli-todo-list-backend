import { Body, Controller, Post } from '@nestjs/common';
import { TaskListCreateRequest } from '../dto/TaskListCreateRequest';
import { TaskService } from '../service/TaskService';

@Controller('/task-lists')
export class TaskListController {
  constructor(private taskService: TaskService) {}

  @Post()
  create(@Body() taskListCreateRequest: TaskListCreateRequest) {
    return this.taskService.createTaskList(taskListCreateRequest);
  }
}
