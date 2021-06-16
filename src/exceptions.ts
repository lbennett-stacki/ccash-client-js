import { ValidationError } from 'class-validator';
import { Exception } from './Exception';

export class BaseUrlMissingException extends Exception {
  constructor() {
    super('base url missing');
  }
}

export class InvalidRequestException extends Exception {
  constructor() {
    super('invalid request');
  }
}

export class InvalidResponseException extends Exception {
  constructor(public readonly errors: ValidationError[]) {
    super(`invalid response: ${JSON.stringify(errors, null, 2)}`);
  }
}

export enum ErrorCodes {
  UserNotFound = -1,
  WrongPassword = -2,
  NameTooLong = -4,
  UserAlreadyExists = -5,
  InsufficientFunds = -6,
}

export enum ExceptionCodes {
  InvalidRequest = -3,
}

export const ExceptionMap = {
  [ExceptionCodes.InvalidRequest]: InvalidRequestException,
};
