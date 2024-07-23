import { Injectable } from '@nestjs/common';
import { TaskListCreateRequest } from '../dto/TaskListCreateRequest';
import { TaskList } from '../entity/TaskList';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
  ) {}

  createTaskList(
    taskListCreateRequest: TaskListCreateRequest,
  ): Promise<TaskList> {
    const taskList = new TaskList();
    taskList.name = taskListCreateRequest.name;
    return this.taskListRepository.save(taskList);
  }
}
