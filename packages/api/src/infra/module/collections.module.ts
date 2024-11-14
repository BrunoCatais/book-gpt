import { Module } from '@nestjs/common';
import { DatabaseAdapter } from '../database/database.adapter';
import { CollectionsResolver } from '../resolver/collections.resolver';
import { CreateCollectionUsecase } from 'src/application/usecase/create-collection';
import { KnexCollectionRepository } from '../repository/knex-collection.repository';
import { FindAllCollectionsUsecase } from 'src/application/usecase/find-all-collections';
import { FindAllFilesByCollectionIdUsecase } from 'src/application/usecase/find-all-files-by-collection-id';
import { KnexFileRepository } from '../repository/knex-file.repository';
import { FindCollectionByIdUsecase } from 'src/application/usecase/find-collection-by-id';
import { FindAllMessagesByCollectionIdUsecase } from 'src/application/usecase/find-all-messages-by-collection-id';
import { KnexMessageRepository } from '../repository/knex-message.repository';

@Module({
  providers: [
    CollectionsResolver,
    {
      provide: 'CollectionRepository',
      useClass: KnexCollectionRepository,
    },
    {
      provide: 'FileRepository',
      useClass: KnexFileRepository,
    },
    {
      provide: 'MessageRepository',
      useClass: KnexMessageRepository,
    },
    FindAllCollectionsUsecase,
    CreateCollectionUsecase,
    FindAllFilesByCollectionIdUsecase,
    DatabaseAdapter,
    FindCollectionByIdUsecase,
    FindAllMessagesByCollectionIdUsecase,
  ],
})
export class CollectionsModule {}
