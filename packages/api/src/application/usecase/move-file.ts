import { Inject, Injectable } from '@nestjs/common';
import FileRepository from '../repository/file.repository';
import CollectionRepository from '../repository/collection.repository';

@Injectable()
export class MoveFileUsecase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepository,
    @Inject('CollectionRepository')
    private readonly collectionRepository: CollectionRepository,
  ) {}

  async execute(fileId: string, collectionId: string | null) {
    const file = await this.fileRepository.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }

    if (collectionId) {
      const collection = await this.collectionRepository.findById(collectionId);
      if (!collection) {
        throw new Error('Collection not found');
      }
    }

    return this.fileRepository.moveFile(fileId, collectionId);
  }
}
