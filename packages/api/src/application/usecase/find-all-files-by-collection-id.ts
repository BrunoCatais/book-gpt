import { Inject, Injectable } from '@nestjs/common';
import FileRepository from '../repository/file.repository';

@Injectable()
export class FindAllFilesByCollectionIdUsecase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepository,
  ) {}

  async execute(collectionId: string) {
    return this.fileRepository.findAllByCollectionId(collectionId);
  }
}
