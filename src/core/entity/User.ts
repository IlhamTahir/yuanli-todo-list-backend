import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './Role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @ManyToMany(() => Role, (role) => role.code)
  @JoinTable({
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: string[];

  @Column()
  encryptedPassword: string;

  @Column({
    default: false,
  })
  locked: boolean;

  @Column({
    default: true,
  })
  enabled: boolean;

  @CreateDateColumn({
    name: 'created_time',
  })
  createdTime: Date;

  @UpdateDateColumn({
    name: 'updated_time',
  })
  updatedTime: Date;
}
