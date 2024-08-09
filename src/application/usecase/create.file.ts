import { Injectable } from '@nestjs/common';
import { File } from 'src/domain/entities/file.entity';
import { KnexFileRepository } from 'src/infra/repository/knex.file.repository';
import { CreateFileInput } from 'src/domain/dto/create-file.input';

@Injectable()
export class CreateFileUsecase {
  constructor(private readonly fileRepository: KnexFileRepository) {
    this.fileRepository = fileRepository;
  }

  async execute(createFileInput: CreateFileInput) {
    const file = File.create(
      createFileInput.name,
      createFileInput.size,
      createFileInput.content,
    );

    return this.fileRepository.create(file);
  }
}
