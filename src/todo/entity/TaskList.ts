import { Column, Entity, OneToMany } from 'typeorm';
import { TraceableEntity } from '../../core/entity/TraceableEntity';
import { TaskListStatus } from '../enum/TaskListStatus';
import { Task } from './Task';

@Entity()
export class TaskList extends TraceableEntity {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TaskListStatus,
    default: TaskListStatus.ACTIVE,
  })
  status: TaskListStatus;

  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];
}
