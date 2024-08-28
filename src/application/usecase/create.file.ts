import { Injectable } from '@nestjs/common';
import { File } from 'src/domain/entities/file.entity';
import { KnexFileRepository } from 'src/infra/repository/knex.file.repository';
import { CreateFileInput } from 'src/domain/dto/create-file.input';
import { VectorStoreFacade } from '../service/vectorstore.facade';

@Injectable()
export class CreateFileUsecase {
  constructor(
    private readonly fileRepository: KnexFileRepository,
    private readonly vectorStoreFacade: VectorStoreFacade,
  ) {
    this.fileRepository = fileRepository;
    this.vectorStoreFacade = vectorStoreFacade;
  }

  async execute(createFileInput: CreateFileInput) {
    const file = File.create(
      createFileInput.name,
      createFileInput.size,
      createFileInput.content,
    );

    await this.vectorStoreFacade.processAndStoreDocument(file.content, file.id);
    return this.fileRepository.create(file);
  }
}
