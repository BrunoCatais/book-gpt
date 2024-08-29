import { Injectable } from '@nestjs/common';
import { KnexFileRepository } from 'src/infra/repository/knex-file.repository';

@Injectable()
export class FindAllFilesUsecase {
  constructor(private readonly fileRepository: KnexFileRepository) {
    this.fileRepository = fileRepository;
  }

  async execute() {
    return this.fileRepository.findAll();
  }
}
