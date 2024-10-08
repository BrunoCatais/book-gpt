import { Injectable } from '@nestjs/common';
import { DatabaseAdapter } from 'src/infra/database/database.adapter';
import { Knex } from 'knex';
import FileRepository from 'src/application/repository/file.repository';
import { File } from 'src/domain/entities/file.entity';

@Injectable()
export class KnexFileRepository implements FileRepository {
  db: Knex;

  constructor(private readonly databaseAdapter: DatabaseAdapter) {
    this.db = this.databaseAdapter.getKnex();
  }

  async create(file: File) {
    const [createdFile] = await this.db('files').insert(file).returning('*');

    return File.restore(createdFile);
  }

  async findAll() {
    const files = await this.db('files').select('*');

    return files.map(File.restore);
  }

  async findById(id: string) {
    const file = await this.db('files').where({ id }).first();

    if (!file) {
      return undefined;
    }

    return File.restore(file);
  }

  async remove(id: string) {
    const file = await this.findById(id);

    if (!file) {
      return undefined;
    }

    await this.db('files').where({ id }).delete();
    return file;
  }
}
