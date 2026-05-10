import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { MyRange } from "src/decorators/my-range.decorator";
import { MyValidator } from "src/decorators/my-validator.decorator";

export class CreateAaaDto {

  @IsNotEmpty({ message: "aaa不能为空" })
  @IsString({ message: "aaa必须是字符串" })
  @IsEmail({}, { message: "aaa必须是一个有效的邮箱地址" })
  aaa: string;

  // @Validate(MyValidator, [11, 22], { message: "fff 校验失败" })
  @MyRange(11, 22, { message: "fff 必须在 11 和 22 之间" })
  fff: string;
}
