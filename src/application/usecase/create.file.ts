import { Injectable } from '@nestjs/common';
import { File } from 'src/domain/entities/file.entity';
import { KnexFileRepository } from 'src/infra/repository/knex.file.repository';
import { CreateFileInput } from 'src/domain/dto/create-file.input';
import { PgVectorStore } from 'src/infra/vectorstore/pg.vectorstore';

@Injectable()
export class CreateFileUsecase {
  constructor(
    private readonly fileRepository: KnexFileRepository,
    private readonly vectorStore: PgVectorStore,
  ) {
    this.fileRepository = fileRepository;
    this.vectorStore = vectorStore;
  }

  async execute(createFileInput: CreateFileInput) {
    const file = File.create(
      createFileInput.name,
      createFileInput.size,
      createFileInput.content,
    );

    const document = this.vectorStore.load(file.content, file.id);
    const splittedDocument = await this.vectorStore.split(document);
    await this.vectorStore.store(splittedDocument);

    return this.fileRepository.create(file);
  }
}
