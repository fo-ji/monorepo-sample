import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/^[A-Za-z0-9]*$/, {
    message: 'Please type using half-width characters',
  })
  password: string;
}
