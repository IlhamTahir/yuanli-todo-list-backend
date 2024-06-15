import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenCreateRequest } from '../dto/TokenCreateRequest';
import { UserService } from './UserService';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createToken(tokenCreateRequest: TokenCreateRequest): Promise<string> {
    // 1. 查看当前用户
    const user = await this.userService.findByUsername(
      tokenCreateRequest.username,
    );
    // 2. 比对密码，判断密码是否有效
    const isMatch = await bcrypt.compare(
      tokenCreateRequest.password,
      user.encryptedPassword,
    );
    if (!isMatch) {
      throw new UnauthorizedException('密码不准确');
    }
    // 3. 生成令牌并返回
    const payload = {
      sub: user.id,
      username: user.username,
    };
    return this.jwtService.signAsync(payload);
  }
}
