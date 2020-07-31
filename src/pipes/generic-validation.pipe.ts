import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

export class GenericValidationPipe<S> implements PipeTransform {
  constructor(private schema: ObjectSchema) {
  }

  transform(value: S, metadata: ArgumentMetadata): any {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException(error);
    }
    return value;
  }

}
