import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  @Get()
  getLogInUser(@Req() req: Request): User | undefined {
    return req.user;
  }
}
