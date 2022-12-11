import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { Csrf } from './interfaces/auth.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('csrf')
  getCsrfToken(@Req() req: Request): Csrf {
    return { csrfToken: req.csrfToken() };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getLogInUser(@Req() req: Request): User | undefined {
    return req.user;
  }

  @Post('signup')
  signUp(@Body() dto: CreateUserDto): void {
    this.authService.signUp(dto);
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
