import { Module } from '@nestjs/common';
import { FilesResolver } from '../resolver/files.resolver';
import { DatabaseAdapter } from 'src/infra/database/database.adapter';
import { KnexFileRepository } from 'src/infra/repository/knex-file.repository';
import { CreateFileUsecase } from 'src/application/usecase/create-file';
import { FindFileByIdUsecase } from 'src/application/usecase/find-file-by-id';
import { FindAllFilesUsecase } from 'src/application/usecase/find-all-files';
import { RemoveFileUsecase } from 'src/application/usecase/remove-file';
import { VectorStoreModule } from './vector-store.module';
import { KnexVectorTableRepository } from '../repository/knex-vector-table.repository';
import { FindAllMessagesByFileIdUsecase } from 'src/application/usecase/find-all-messages-by-file-id';
import { KnexMessageRepository } from '../repository/knex-message.repository';
import { MoveFileUsecase } from 'src/application/usecase/move-file';
import { KnexCollectionRepository } from '../repository/knex-collection.repository';

@Module({
  providers: [
    FilesResolver,
    {
      provide: 'FileRepository',
      useClass: KnexFileRepository,
    },
    DatabaseAdapter,
    CreateFileUsecase,
    FindFileByIdUsecase,
    FindAllFilesUsecase,
    RemoveFileUsecase,
    {
      provide: 'VectorTableRepository',
      useClass: KnexVectorTableRepository,
    },
    FindAllMessagesByFileIdUsecase,
    {
      provide: 'MessageRepository',
      useClass: KnexMessageRepository,
    },
    MoveFileUsecase,
    {
      provide: 'CollectionRepository',
      useClass: KnexCollectionRepository,
    },
  ],
  imports: [VectorStoreModule],
})
export class FilesModule {}
