import { IsInt, IsString, IsArray, ValidateNested } from 'class-validator';
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
