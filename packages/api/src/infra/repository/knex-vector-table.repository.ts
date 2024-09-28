import { Injectable } from '@nestjs/common';
import { DatabaseAdapter } from 'src/infra/database/database.adapter';
import { Knex } from 'knex';
import VectorTableRepository from 'src/application/repository/vector-table.repository';

@Injectable()
export class KnexVectorTableRepository implements VectorTableRepository {
  db: Knex;

  constructor(private readonly databaseAdapter: DatabaseAdapter) {
    this.db = this.databaseAdapter.getKnex();
  }

  removeAllByFileId(id: string): Promise<void> {
    return this.db('vector_table')
      .whereRaw("metadata->>'file_id' = ?", [id])
      .del();
  }
}
