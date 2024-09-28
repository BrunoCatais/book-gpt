import { Inject, Injectable } from '@nestjs/common';
import FileRepository from '../repository/file.repository';

@Injectable()
export class FindAllFilesUsecase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepository,
  ) {}

  async execute() {
    return this.fileRepository.findAll();
  }
}
