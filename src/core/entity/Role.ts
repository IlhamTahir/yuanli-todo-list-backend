import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Role extends BaseEntity {
  @Column({
    unique: true,
  })
  code: string;

  @Column()
  label: string;
}
