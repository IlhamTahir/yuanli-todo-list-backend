import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { TaskStatus } from '../enum/TaskStatus';
import { TraceableEntity } from '../../core/entity/TraceableEntity';
import { TaskList } from './TaskList';

@Entity()
export class Task extends TraceableEntity {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    default: TaskStatus.TO_DO,
    enum: TaskStatus,
  })
  status: TaskStatus;

  @ManyToOne(() => TaskList)
  @JoinColumn({ name: 'taskListId' })
  taskList: TaskList;
}
