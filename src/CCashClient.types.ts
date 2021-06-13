import { User } from './User';

export { User };

export interface ICCashClient {
  // Usage
  balance(user: string): Promise<number>;
  log(user: string, pass: string, transactionCount?: number): Promise<number[]>;
  sendFunds(
    user: string,
    pass: string,
    to: string,
    amount: number
  ): Promise<number>;
  verifyPassword(user: string, pass: string): Promise<boolean>;

  // Meta usage
  changePassword(user: string, pass: string, newPass: string): Promise<User>;
  setBalance(user: string, pass: string, amount: number): Promise<number>;

  // System usage
  help(): Promise<string>;
  ping(): Promise<boolean>;
  close(pass: string): Promise<boolean>;
  contains(user: string): Promise<boolean>;
  adminVerifyPass(pass: string): Promise<boolean>;

  // User management
  addUser(user: string, pass: string): Promise<User>;
  adminAddUser(
    user: string,
    pass: string,
    initialPass: string,
    initialBalance: number
  ): Promise<User>;
  deleteUser(user: string, pass: string): Promise<User>;
  adminDeleteUser(user: string, pass: string): Promise<User>;
}
