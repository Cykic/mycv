import { BadRequestException } from '@nestjs/common';

export class Response {
  success(data: Array<any>, option?: object) {
    return {
      status: 'success',
      option,
      length: data.length,
      data,
    };
  }

  successMessage(message: string, data?: object) {
    return {
      status: 'success',
      message,
      data,
    };
  }

  fail(message: string, status?: number, description?: string) {
    throw new BadRequestException({
      status: 'fail',
      message,
      description,
    });
  }
}
