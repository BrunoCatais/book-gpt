import { Inject, Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import FileRepository from '../repository/file.repository';
import VectorTableRepository from '../repository/vector-table.repository';

@Injectable()
export class RemoveFileUsecase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepository,
    @Inject('VectorTableRepository')
    private readonly vectorTableRepository: VectorTableRepository,
  ) {}

  async execute(id: string) {
    const file = await this.fileRepository.findById(id);
    if (!file) throw new GraphQLError('File not found');

    await this.vectorTableRepository.removeAllByFileId(id);
    return this.fileRepository.remove(id);
  }
}
