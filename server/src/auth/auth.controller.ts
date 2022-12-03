import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import type { Response, Request } from 'express';

import { AuthService } from './auth.service';
import type { CreateUserDto } from '@/user/dto/create-user.dto';
import type { AuthDto } from './dto/auth.dto';
import type { User } from '@prisma/client';
import type { Csrf } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('csrf')
  getCsrfToken(@Req() req: Request): Csrf {
    return { csrfToken: req.csrfToken() };
  }

  @Post('signup')
  signUp(@Body() dto: CreateUserDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async logIn(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<User> {
    const { accessToken, user } = await this.authService.logIn(dto);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logOut(
    // @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): void {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
  }
}
