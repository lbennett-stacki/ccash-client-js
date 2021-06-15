import { IsInt, IsString, IsArray, ValidateNested } from 'class-validator';
import { LogItem } from './CCashClient.types';

export interface ApiResponse<T> {
  value: T;
}

export type ResponseValidatorConstructor<T = any> = new (
  response: ApiResponse<T>
) => ApiResponse<T>;

export class ResponseValidator<T> {
  value: T;

  constructor(response: ApiResponse<T>) {
    this.value = response.value;
  }
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
