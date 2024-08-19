import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { KnexFileRepository } from 'src/infra/repository/knex.file.repository';
import { KnexVectorTableRepository } from 'src/infra/repository/knex.vector.table.repository';

@Injectable()
export class RemoveFileUsecase {
  constructor(
    private readonly fileRepository: KnexFileRepository,
    private readonly vectorTableRepository: KnexVectorTableRepository,
  ) {
    this.fileRepository = fileRepository;
    this.vectorTableRepository = vectorTableRepository;
  }

  async execute(id: string) {
    const file = await this.fileRepository.findById(id);
    if (!file) throw new GraphQLError('File not found');

    await this.vectorTableRepository.removeAllByFileId(id);
    return this.fileRepository.remove(id);
  }
}
