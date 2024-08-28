import { Module } from '@nestjs/common';
import { PgVectorStore } from '../vectorstore/pg.vectorstore';
import { KnexVectorTableRepository } from '../repository/knex.vector.table.repository';
import { DatabaseAdapter } from '../database/database.adapter';
import { VectorStoreFacade } from 'src/application/service/vectorstore.facade';

@Module({
  providers: [
    PgVectorStore,
    KnexVectorTableRepository,
    DatabaseAdapter,
    VectorStoreFacade,
  ],
  exports: [VectorStoreFacade],
})
export class VectorStoreModule {}
