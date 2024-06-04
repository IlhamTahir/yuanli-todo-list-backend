import { IsNotEmpty, MinLength } from 'class-validator';

export class UserCreateRequest {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  username: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码至少为6为字符',
  })
  password: string;
}
