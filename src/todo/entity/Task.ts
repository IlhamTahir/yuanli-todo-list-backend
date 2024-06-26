import { Column, Entity } from 'typeorm';
import { TaskStatus } from '../enum/TaskStatus';
import { TraceableEntity } from '../../core/entity/TraceableEntity';

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
}
