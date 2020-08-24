import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectIdValidationPipe } from './objectId-validation.pipe';

describe('Object ID Validation Pipe Unit Test', () => {
  let objectIdValidationPipe: ObjectIdValidationPipe;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ObjectIdValidationPipe]
    }).compile();

    objectIdValidationPipe = app.get<ObjectIdValidationPipe>(ObjectIdValidationPipe);
  });

  it ('should throw with invalid object id', () => {
    const invalidObjectId = '______';
    const argumentMetadata: ArgumentMetadata = {
      type: 'param'
    };
    expect(() => objectIdValidationPipe.transform(invalidObjectId, argumentMetadata)).toThrow(BadRequestException);
  });

  it ('should return the object id it is valid', () => {
    const validObjectId = 'zzzzzzzzzzzz';
    const argumentMetadata: ArgumentMetadata = {
      type: 'param',
    };
    expect(objectIdValidationPipe.transform(validObjectId, argumentMetadata)).toBe(validObjectId);
  });

  afterAll(async () => {
    await app.close();
  });

});
