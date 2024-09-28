import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseAdapter } from '../database/database.adapter';
import CollectionRepository from 'src/application/repository/collection.repository';
import { Collection } from 'src/domain/entities/collection.entity';

@Injectable()
export class KnexCollectionRepository implements CollectionRepository {
  db: Knex;

  constructor(private readonly databaseAdapter: DatabaseAdapter) {
    this.db = this.databaseAdapter.getKnex();
  }

  async create(collection: Collection) {
    const [createdCollection] = await this.db('collections')
      .insert(collection)
      .returning('*');

    return Collection.restore(createdCollection);
  }
}
