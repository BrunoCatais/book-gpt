import { Module } from '@nestjs/common';
import { PgVectorStore } from '../vectorstore/pg.vectorstore';
import { KnexVectorTableRepository } from '../repository/knex.vector.table.repository';
import { DatabaseAdapter } from '../database/database.adapter';

@Module({
  providers: [PgVectorStore, KnexVectorTableRepository, DatabaseAdapter],
})
export class VectorStoreModule {}
