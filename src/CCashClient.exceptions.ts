import { Exception } from './Exception';

export class BaseUrlMissingException extends Exception {
  constructor() {
    super('base url missing');
  }
}

export class UserNotFoundException extends Exception {
  constructor() {
    super('user not found');
  }
}

export class WrongPasswordException extends Exception {
  constructor() {
    super('wrong password');
  }
}

export class InvalidRequestException extends Exception {
  constructor() {
    super('invalid request');
  }
}

export class NameTooLongException extends Exception {
  constructor() {
    super('name too long');
  }
}

export class UserAlreadyExistsException extends Exception {
  constructor() {
    super('user already exists');
  }
}

export class InsufficientFundsException extends Exception {
  constructor() {
    super('insufficient funds');
  }
}

export enum ErrorCodes {
  UserNotFound = -1,
  WrongPassword = -2,
  InvalidRequest = -3,
  NameTooLong = -5,
  UserAlreadyExists = -6,
  InsufficientFunds = -7,
}

export const ExceptionMap = {
  [ErrorCodes.UserNotFound]: UserNotFoundException,
  [ErrorCodes.WrongPassword]: WrongPasswordException,
  [ErrorCodes.InvalidRequest]: InvalidRequestException,
  [ErrorCodes.NameTooLong]: NameTooLongException,
  [ErrorCodes.UserAlreadyExists]: UserAlreadyExistsException,
  [ErrorCodes.InsufficientFunds]: InsufficientFundsException,
};
