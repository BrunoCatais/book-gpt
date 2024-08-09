import { Injectable } from '@nestjs/common';
import { CreateFileInput } from './dto/create-file.input';

@Injectable()
export class FilesService {
  create(createFileInput: CreateFileInput) {
    return 'This action adds a new file' + createFileInput;
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
