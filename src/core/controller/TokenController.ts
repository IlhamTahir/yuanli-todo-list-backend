import { Body, Controller, Post } from '@nestjs/common';
import { TokenCreateRequest } from '../dto/TokenCreateRequest';
import { AuthService } from '../service/AuthService';

@Controller('tokens')
export class TokenController {
  constructor(private authService: AuthService) {}

  @Post()
  create(@Body() tokenCreateRequest: TokenCreateRequest) {
    return this.authService.createToken(tokenCreateRequest);
  }
}
