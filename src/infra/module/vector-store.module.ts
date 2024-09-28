import { Module } from '@nestjs/common';
import { PgVectorStore } from '../vector-store/pg-vector-store';
import { KnexVectorTableRepository } from '../repository/knex-vector-table.repository';
import { DatabaseAdapter } from '../database/database.adapter';
import { VectorStoreFacade } from 'src/application/service/vector-store.facade';

@Module({
  providers: [
    {
      provide: 'VectorStore',
      useClass: PgVectorStore,
    },
    KnexVectorTableRepository,
    DatabaseAdapter,
    VectorStoreFacade,
  ],
  exports: [VectorStoreFacade, 'VectorStore'],
})
export class VectorStoreModule {}
