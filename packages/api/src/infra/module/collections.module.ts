import { Module } from '@nestjs/common';
import { DatabaseAdapter } from '../database/database.adapter';
import { CollectionsResolver } from '../resolver/collections.resolver';
import { CreateCollectionUsecase } from 'src/application/usecase/create-collection';
import { KnexCollectionRepository } from '../repository/knex-collection.repository';

@Module({
  providers: [
    CollectionsResolver,
    {
      provide: 'CollectionRepository',
      useClass: KnexCollectionRepository,
    },
    CreateCollectionUsecase,
    DatabaseAdapter,
  ],
})
export class CollectionsModule {}
