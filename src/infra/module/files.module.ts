import { Module } from '@nestjs/common';
import { FilesResolver } from '../resolver/files.resolver';
import { DatabaseAdapter } from 'src/infra/database/database.adapter';
import { KnexFileRepository } from 'src/infra/repository/knex.file.repository';
import { CreateFileUsecase } from 'src/application/usecase/create.file';
import { FindFileByIdUsecase } from 'src/application/usecase/find.file.by.id';
import { FindAllFilesUsecase } from 'src/application/usecase/find.all.files';
import { RemoveFileUsecase } from 'src/application/usecase/remove-file';

@Module({
  providers: [
    FilesResolver,
    KnexFileRepository,
    DatabaseAdapter,
    CreateFileUsecase,
    FindFileByIdUsecase,
    FindAllFilesUsecase,
    RemoveFileUsecase,
  ],
})
export class FilesModule {}
