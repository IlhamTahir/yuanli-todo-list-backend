import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateRequest } from '../dto/UserCreateRequest';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return this.userRepository.findOneBy({
      username,
    });
  }

  async create(userCreateRequest: UserCreateRequest) {
    const existedUser = await this.findByUsername(userCreateRequest.username);
    if (existedUser) {
      throw new HttpException('该用户名已被占用', 400);
    }
    const user = new User();
    user.username = userCreateRequest.username;
    user.encryptedPassword = userCreateRequest.password;
    const salt = await bcrypt.genSalt(10);
    user.encryptedPassword = await bcrypt.hash(
      userCreateRequest.password,
      salt,
    );
    return this.userRepository.save(user);
  }
}
