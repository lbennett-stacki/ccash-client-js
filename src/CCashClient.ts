import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { validate } from 'class-validator';
import { LogCall } from './LogCall';
import { ICCashClient } from './CCashClient.types';
import {
  ApiResponse,
  ResponseValidatorConstructor,
  NumberResponseValidator,
  LogResponseValidator,
  StringResponseValidator,
} from './responses';
import {
  BaseUrlMissingException,
  InvalidResponseException,
  ExceptionCodes,
  ExceptionMap,
  ErrorCodes,
} from './exceptions';

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

  @LogCall
  balance(user: string): Promise<number> {
    return this.http
      .get(`/${user}/bal`)
      .then(async (response) => await this.handleResponse(response));
  }

  @LogCall
  log(user: string, password: string): Promise<number[]> {
    return this.http
      .get(`/${user}/log`, {
        headers: { Password: password },
      })
      .then((response) =>
        this.handleResponse<number[]>(response, LogResponseValidator)
      );
  }

  @LogCall
  sendFunds(
    user: string,
    password: string,
    to: string,
    amount: number
  ): Promise<number> {
    return this.http
      .post(`/${user}/send/${to}`, undefined, {
        headers: { Password: password },
        params: { amount: amount },
      })
      .then((response) => this.handleResponse(response));
  }

  @LogCall
  verifyPassword(user: string, password: string): Promise<number> {
    return this.http
      .get(`/${user}/pass/verify`, { headers: { Password: password } })
      .then((response) => this.handleResponse(response));
  }

  @LogCall
  changePassword(
    user: string,
    password: string,
    newPassword: string
  ): Promise<number> {
    return this.http
      .patch(`/${user}/pass/change`, newPassword, {
        headers: { Password: password },
      })
      .then((response) => this.handleResponse(response));
  }

  @LogCall
  setBalance(user: string, password: string, amount: number): Promise<number> {
    return this.http
      .patch(`/admin/${user}/bal`, undefined, {
        headers: { Password: password },
        params: { amount: amount },
      })
      .then((response) => this.handleResponse(response));
  }

  @LogCall
  help(): Promise<string> {
    return this.http
      .get('/help')
      .then((response) =>
        this.handleResponse(response, StringResponseValidator)
      );
  }

  @LogCall
  ping(): Promise<'pong'> {
    return this.http
      .get('/ping')
      .then((response) =>
        this.handleResponse(response, StringResponseValidator)
      );
  }

  @LogCall
  close(password: string): Promise<number> {
    return this.http
      .post('/close', undefined, { headers: { Password: password } })
      .then((response) => this.handleResponse(response));
  }

  @LogCall
  contains(user: string): Promise<number> {
    return this.http
      .get(`/contains/${user}`)
      .then((response) => this.handleResponse(response));
  }

  @LogCall
  adminVerifyPassword(password: string): Promise<number> {
    return this.http
      .get('/admin/verify', { headers: { Password: password } })
      .then((response) => this.handleResponse(response));
  }

  @LogCall
  addUser(user: string, password: string): Promise<number> {
    return this.http
      .post(`/user/${user}`, undefined, { headers: { Password: password } })
      .then((response) => this.handleResponse(response));
  }

  @LogCall
  adminAddUser(
    user: string,
    password: string,
    initialPassword: string,
    initialBalance: number
  ): Promise<number> {
    return this.http
      .post(`/admin/user/${user}`, initialPassword, {
        headers: { Password: password },
        params: { init_bal: initialBalance },
      })
      .then((response) => this.handleResponse(response));
  }

  @LogCall
  deleteUser(user: string, password: string): Promise<number> {
    return this.http
      .delete(`/user/${user}`, { headers: { Password: password } })
      .then((response) => this.handleResponse(response));
  }

  @LogCall
  adminDeleteUser(user: string, password: string): Promise<number> {
    return this.http
      .delete(`/admin/user/${user}`, { headers: { Password: password } })
      .then((response) => this.handleResponse(response));
  }

  private async handleResponse<T = number>(
    response: AxiosResponse<ApiResponse<any>>,
    Validator: ResponseValidatorConstructor = NumberResponseValidator
  ): Promise<T> {
    log('response:', response.data);
    log('validator:', Validator);

    const value = response.data?.value ?? response.data;

    typeof value === 'number' && this.handleExceptions(value);

    const errors = await validate(new Validator({ value }));

    if (errors.length > 0) {
      throw new InvalidResponseException(errors);
    }

    return value;
  }

  private handleExceptions(value: number): void {
    if (value && Object.values(ExceptionCodes).includes(value)) {
      throw new ExceptionMap[value as ExceptionCodes]();
    }
  }
}
