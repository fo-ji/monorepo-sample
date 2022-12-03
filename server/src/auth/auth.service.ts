import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '@/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import type { User } from '@prisma/client';
import type { AuthUser } from './interfaces/auth.interface';
import type { AuthDto } from './dto/auth.dto';
import type { CreateUserDto } from '@/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signUp(dto: CreateUserDto): Promise<User> {
    const { name, email, password } = dto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const user = await this.prismaService.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });

      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('This email is already existed');
      }

      throw error;
    }
  }

  async logIn(dto: AuthDto): Promise<AuthUser> {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, email: user.email }; // MEMO: 項目増やした方が安全かも
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: 3600, // MEMO: 適切な時間に適宜変更
      });
      return { accessToken, user };
    }

    throw new UnauthorizedException('Email or password is incorrect');
  }
}
