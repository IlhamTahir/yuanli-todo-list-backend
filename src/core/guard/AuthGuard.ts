import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TOKEN_PREFIX } from '../constant/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // 白名单
    if (['/tokens', '/task-lists'].includes(request.url)) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    try {
      request['user'] = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('非法token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    if (!request.headers.authorization) {
      return '';
    }
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === TOKEN_PREFIX ? token : '';
  }
}
