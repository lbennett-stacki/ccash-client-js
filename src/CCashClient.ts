import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { ICCashClient, User } from './CCashClient.types';
import {
  BaseUrlMissingException,
  ExceptionMap,
  ErrorCodes,
} from './CCashClient.exceptions';

export class CCashClient implements ICCashClient {
  http: AxiosInstance;

  constructor(baseURL: string | undefined = process.env.CCASH_API_BASE_URL) {
    if (!baseURL) {
      throw new BaseUrlMissingException();
    }

    this.http = axios.create({
      baseURL,
    });
  }

  balance(user: string): Promise<number> {
    return this.http
      .get(`/${user}/bal`)
      .then((response) => this.handleError(response) || response.data.value);
  }

  log(
    user: string,
    pass: string,
    transactionCount: number = 10
  ): Promise<number[]> {
    return this.http
      .get(`/${user}/bal`, {
        headers: { Password: pass },
        params: { n: transactionCount },
      })
      .then((response) => this.handleError(response) || response.data.value);
  }

  sendFunds(
    user: string,
    pass: string,
    to: string,
    amount: number
  ): Promise<number> {
    return this.http
      .post(`/${user}/send/${to}`, {
        headers: { Password: pass },
        params: { amount },
      })
      .then((response) => this.handleError(response) || amount);
  }

  verifyPassword(user: string, pass: string): Promise<boolean> {
    return this.http
      .get(`/${user}/pass/verify`, { headers: { Password: pass } })
      .then((response) => this.handleError(response) || response.data.value);
  }

  changePassword(user: string, pass: string, newPass: string): Promise<User> {
    return this.http
      .patch(
        `/${user}/pass/change`,
        { password: newPass },
        { headers: { Password: pass } }
      )
      .then(
        (response) =>
          this.handleError(response) || this.serialize(User, { user })
      );
  }

  setBalance(user: string, pass: string, amount: number): Promise<number> {
    return this.http
      .patch(`/admin/${user}/bal`, undefined, {
        headers: { Password: pass },
        params: { amount },
      })
      .then((response) => this.handleError(response) || amount);
  }

  help(): Promise<string> {
    return this.http.get('/help').then((response) => response.data);
  }

  ping(): Promise<boolean> {
    return this.http.get('/ping').then((response) => response.data || false);
  }

  close(pass: string): Promise<boolean> {
    return this.http
      .post('/close', undefined, { headers: { Password: pass } })
      .then((response) => this.handleError(response) || true);
  }

  contains(user: string): Promise<boolean> {
    return this.http
      .get(`/contains/${user}`)
      .then(
        (response) => this.handleError(response) || response.data.value || false
      );
  }

  adminVerifyPass(pass: string): Promise<boolean> {
    return this.http
      .get('/admin/verify')
      .then(
        (response) => this.handleError(response) || response.data.value || false
      );
  }

  addUser(user: string, pass: string): Promise<User> {
    return this.http
      .post(`/user/${user}`, undefined, { headers: { Password: pass } })
      .then(
        (response) =>
          this.handleError(response) || this.serialize(User, { user })
      );
  }

  adminAddUser(
    user: string,
    pass: string,
    initialPass: string,
    initialBalance: number
  ): Promise<User> {
    return this.http
      .post(
        `/user/${user}`,
        { password: initialPass },
        {
          headers: { Password: pass },
          params: { init_bal: initialBalance },
        }
      )
      .then(
        (response) =>
          this.handleError(response) || this.serialize(User, { user })
      );
  }

  deleteUser(user: string, pass: string): Promise<User> {
    return this.http
      .delete(`/user/${user}`, { headers: { Password: pass } })
      .then(
        (response) =>
          this.handleError(response) || this.serialize(User, { user })
      );
  }

  adminDeleteUser(user: string, pass: string): Promise<User> {
    return this.http
      .delete(`/user/${user}`, { headers: { Password: pass } })
      .then(
        (response) =>
          this.handleError(response) || this.serialize(User, { user })
      );
  }

  private handleError(response: AxiosResponse<any>): false {
    if (
      response.data.value &&
      Object.values(ErrorCodes).includes(response.data.value)
    ) {
      throw new ExceptionMap[response.data.value as ErrorCodes]();
    }

    return false;
  }

  private serialize = plainToClass;
}
