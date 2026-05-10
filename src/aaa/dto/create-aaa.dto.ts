import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAaaDto {

  @IsNotEmpty({ message: "aaa不能为空" })
  @IsString({ message: "aaa必须是字符串" })
  @IsEmail({}, { message: "aaa必须是一个有效的邮箱地址" })
  aaa: string;
}
