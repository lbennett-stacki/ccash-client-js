import {
  IsInt,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
  Min,
} from 'class-validator';

export class UserValidator {
  constructor(username: string, password: string, initialBalance?: number) {
    this.username = username;
    this.password = password;
    this.initialBalance = initialBalance;
  }

  @IsString()
  @Matches('[a-z0-9_]+', 'i')
  @MinLength(3)
  @MaxLength(16)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  initialBalance?: number;
}
