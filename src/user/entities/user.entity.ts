import { Exclude, Expose, Transform } from "class-transformer";

export class User {
  id: number;

  username: string;

  @Exclude()
  password: string;

  @Expose()
  get xxx() {
    return `${this.username} (${this.email})`;
  }

  @Transform(({ value }) => `email: ${value}`)
  email: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
