import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../service/UserService';
import { UserCreateRequest } from '../dto/UserCreateRequest';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() userCreateRequest: UserCreateRequest) {
    return this.userService.create(userCreateRequest);
  }
}
