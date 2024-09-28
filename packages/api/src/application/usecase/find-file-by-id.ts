import { Inject, Injectable } from '@nestjs/common';
import FileRepository from '../repository/file.repository';

@Injectable()
export class FindFileByIdUsecase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepository,
  ) {}

  async execute(id: string) {
    return this.fileRepository.findById(id);
  }
}
