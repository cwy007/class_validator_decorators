import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'MyValidator', async: false })
export class MyValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    console.log('Validating value:', value);
    console.log('Validation arguments:', args);

    const constraints = args.constraints;
    const minValue = constraints[0];
    const maxValue = constraints[1];
    console.log('Custom constraints:', constraints);
    console.log('Min value:', minValue);
    console.log('Max value:', maxValue);
    // 在这里实现你的验证逻辑
    return typeof value === 'number' && value >= minValue && value <= maxValue;
  }

  defaultMessage(args: ValidationArguments) {
    return `Value must be a number between ${args.constraints[0]} and ${args.constraints[1]}`;
  }
}