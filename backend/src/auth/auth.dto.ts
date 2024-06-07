import { MESSAGES, REGEX } from '../app.utils';
import { Trim } from 'class-sanitizer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @Trim()
  @IsEmail()
  public readonly username: string;

  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  public readonly password: string;

  @IsString()
  @IsOptional()
  public readonly firstname?: string;

  @IsString()
  @IsOptional()
  public readonly lastname?: string;

  @IsInt()
  public readonly created_at: number;

  @IsInt()
  public readonly updated_at: number;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  public readonly username: string;

  @IsString()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  public readonly password: string;

}
