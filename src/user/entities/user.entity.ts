import { Exclude, Expose, Transform } from "class-transformer";

export class User {
  id: number;

  username: string;

  @Exclude()
  password: string;

  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Expose()
  get maskedEmail() {
    const [localPart, domain] = this.email.split("@");
    const maskedLocalPart = localPart[0] + "****" + localPart.slice(-1);
    return `${maskedLocalPart}@${domain}`;
  }


  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
