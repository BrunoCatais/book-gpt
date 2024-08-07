import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  hello(): string {
    return 'Hello World!';
  }
}
