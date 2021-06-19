import {
  IsInt,
  IsString,
  IsArray,
  ValidateNested,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
  Min,
} from 'class-validator';
import { LogItem } from './CCashClient.types';

export type ResponseValidatorConstructor<T = any> = new (response: T) => T;

export class ResponseValidator<T> {
  constructor(public readonly value: T) {}
}

export class NumberResponseValidator extends ResponseValidator<number> {
  @IsInt()
  value!: number;
}

export class StringResponseValidator extends ResponseValidator<string> {
  @IsString()
  value!: string;
}

export class LogItemValidator implements LogItem {
  @IsInt()
  amount!: number;

  @IsString()
  from!: string;

  @IsString()
  to!: string;

  @IsInt()
  time!: number;
}

export class LogResponseValidator extends ResponseValidator<LogItem[]> {
  @IsArray()
  @ValidateNested({ each: true })
  value!: LogItemValidator[];
}

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
