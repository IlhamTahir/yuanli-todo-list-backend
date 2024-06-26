import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from './Role';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
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
}
