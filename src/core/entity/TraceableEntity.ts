import { BaseEntity } from './BaseEntity';
import { ManyToOne } from 'typeorm';
import { User } from './User';

export abstract class TraceableEntity extends BaseEntity {
  @ManyToOne(() => User)
  createBy: User;

  @ManyToOne(() => User)
  updateBy: User;
}
