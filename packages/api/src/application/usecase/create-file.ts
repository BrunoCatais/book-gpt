import { Inject, Injectable } from '@nestjs/common';
import { File } from 'src/domain/entities/file.entity';
import { CreateFileInput } from 'src/domain/dto/create-file.input';
import { VectorStoreFacade } from '../service/vector-store.facade';
import FileRepository from '../repository/file.repository';

@Injectable()
export class CreateFileUsecase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepository,
    private readonly vectorStoreFacade: VectorStoreFacade,
  ) {}

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
