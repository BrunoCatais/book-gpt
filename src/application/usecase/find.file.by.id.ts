import { Injectable } from '@nestjs/common';
import { KnexFileRepository } from 'src/infra/repository/knex.file.repository';

@Injectable()
export class FindFileByIdUsecase {
  constructor(private readonly fileRepository: KnexFileRepository) {
    this.fileRepository = fileRepository;
  }

  async execute(id: string) {
    return this.fileRepository.findById(id);
  }
}
