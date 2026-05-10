import { applyDecorators } from "@nestjs/common";
import { MyValidator } from "./my-validator.decorator";
import { Validate, ValidationOptions } from "class-validator";

export function MyRange(min: number, max: number, validationOptions?: ValidationOptions) {
  return applyDecorators(
    Validate(MyValidator, [min, max], validationOptions)
  )
}