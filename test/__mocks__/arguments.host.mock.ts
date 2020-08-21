import { ArgumentsHost } from '@nestjs/common';

const mockedJsonResponse = jest.fn();

const mockedExecution: ArgumentsHost = {
  switchToHttp: jest.fn().mockReturnValue({
    getResponse: jest.fn().mockReturnValue({
      status: jest.fn().mockReturnThis(),
      json: mockedJsonResponse,
    })
  }),
  switchToWs: jest.fn(),
  switchToRpc: jest.fn(),
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
};

export {
  mockedJsonResponse
}

export default mockedExecution;
