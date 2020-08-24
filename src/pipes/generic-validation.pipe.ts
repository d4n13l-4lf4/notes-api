import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

export class GenericValidationPipe<S> implements PipeTransform {
  constructor(private schema: ObjectSchema) {
  }

  transform(value: S, metadata: ArgumentMetadata): S {
    const { error } = this.schema.validate(value);

    if (error) {
      throw error;
    }
    return value;
  }

}
