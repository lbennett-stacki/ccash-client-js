import { ValidationError } from 'class-validator';

export interface ICCashClient {
  // Usage
  balance(user: string): Promise<number>;
  log(user: string, password: string): Promise<number[]>;
  sendFunds(
    user: string,
    password: string,
    to: string,
    amount: number
  ): Promise<number>;
  verifyPassword(user: string, password: string): Promise<number>;

  // Meta usage
  changePassword(
    user: string,
    password: string,
    newPassword: string
  ): Promise<number>;
  setBalance(user: string, password: string, amount: number): Promise<number>;

  // System usage
  help(): Promise<string>;
  ping(): Promise<'pong'>;
  close(password: string): Promise<number>;
  contains(user: string): Promise<number>;
  adminVerifyPassword(password: string): Promise<number>;

  // User management
  addUser(user: string, password: string): Promise<number | ValidationError[]>;
  adminAddUser(
    user: string,
    password: string,
    initialPassword: string,
    initialBalance: number
  ): Promise<number | ValidationError[]>;
  deleteUser(user: string, password: string): Promise<number>;
  adminDeleteUser(user: string, password: string): Promise<number>;
}

export interface LogItem {
  amount: number;
  from: string;
  to: string;
  time: number;
}
