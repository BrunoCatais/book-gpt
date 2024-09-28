import { Injectable } from '@nestjs/common';
import Knex from 'knex';
import knexConfig from '../../../knexfile';
import { Knex as knexType } from 'knex';

@Injectable()
export class DatabaseAdapter {
  private knex;

  constructor() {
    this.knex = Knex(knexConfig.development);
  }

  getKnex(): knexType {
    return this.knex;
  }
}
