import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import MessageRepository from 'src/application/repository/message.repository';
import { DatabaseAdapter } from '../database/database.adapter';
import { Message } from 'src/domain/entities/message.entity';

@Injectable()
export class KnexMessageRepository implements MessageRepository {
  db: Knex;

  constructor(private readonly databaseAdapter: DatabaseAdapter) {
    this.db = this.databaseAdapter.getKnex();
  }

  async create(message: Message) {
    const [createdMessage] = await this.db('messages')
      .insert(message)
      .returning('*');

    return Message.restore(createdMessage);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(id: string): Promise<Message | undefined> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Message[]> {
    throw new Error('Method not implemented.');
  }
}