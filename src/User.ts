import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class User {
  @Expose()
  user!: string;
}
