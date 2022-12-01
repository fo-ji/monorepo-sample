import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { ConfigService } from '@nestjs/config';
import type { PrismaService } from '@/prisma/prisma.service';
import type { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          if (req && req.cookies) return req.cookies.access_token;
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: { id: string; email: string }): Promise<User> {
    const { id, email } = payload;

    const user = await this.prismaService.user.findUnique({
      where: { id, email },
    });

    if (user) return user;
    throw new UnauthorizedException();
  }
}
