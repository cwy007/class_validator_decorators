import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform } from "class-transformer";

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiHideProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    description: "Masked email address",
    type: String,
  })
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
