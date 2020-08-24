import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform<string> {

  transform(value: string, metadata: ArgumentMetadata): string {
    const valid = Types.ObjectId.isValid(value);

    if (!valid)
      throw new BadRequestException('Invalid Object ID');

    return value;
  }

}
