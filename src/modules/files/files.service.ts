import { Injectable } from '@nestjs/common';
import { CreateFileInput } from './dto/create-file.input';
import { DatabaseService } from 'src/infra/database.service';
import { Knex } from 'knex';

@Injectable()
export class FilesService {
  db: Knex;

  constructor(private readonly dbService: DatabaseService) {
    this.db = dbService.getKnex();
  }

  create(createFileInput: CreateFileInput) {
    return this.db('files').insert(createFileInput).returning('*');
  }

  findAll() {
    return this.db('files').select('*');
  }

  findOne(id: number) {
    return this.db('files').where({ id }).first();
  }

  remove(id: number) {
    return this.db('files').where({ id }).delete();
  }
}
