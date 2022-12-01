import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { AuthDto } from '@/auth/dto/auth.dto';

export class CreateUserDto extends AuthDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
