import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { CLASS_SERIALIZER_OPTIONS } from './serialize-options.decorator';
import { ClassTransformOptions } from 'class-transformer';
import * as classTransformer from 'class-transformer';

const isObject = (value: any): value is Record<string, any> => {
  return value !== null && typeof value === 'object';
};

@Injectable()
export class ClassSerializerInterceptor implements NestInterceptor {
  @Inject(Reflector)
  private readonly reflector: Reflector;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextOptions = this.getContextOptions(context);
    console.log('ClassSerializerInterceptor context options:', contextOptions);
    return next
      .handle()
      .pipe(map((response) => this.serialize(response, contextOptions)));
  }

  serialize(
    response: Record<string, any> | Array<Record<string, any>>,
    options: ClassTransformOptions,
  ) {
    if (!isObject(response) || response instanceof StreamableFile) {
      // Return the original response if it's not an object or is a StreamableFile
      return response;
    }

    return Array.isArray(response)
      ? response.map((item) => this.transformToNewPlain(item, options))
      : this.transformToNewPlain(response, options);
  }

  transformToNewPlain(plain: any, options: ClassTransformOptions) {
    // Implement transformation logic here using class-transformer or any other method
    if (!plain) {
      return plain;
    }

    return classTransformer.instanceToPlain(plain, options);
  }

  protected getContextOptions(context: ExecutionContext) {
    const options =
      this.reflector.getAllAndOverride(CLASS_SERIALIZER_OPTIONS, [
        context.getHandler(),
        context.getClass(),
      ]) || {};
    return options;
  }
}
