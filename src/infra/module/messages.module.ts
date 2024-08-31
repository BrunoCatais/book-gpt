import { Module } from '@nestjs/common';
import { MessagesResolver } from '../resolver/messages.resolver';
import { KnexMessageRepository } from '../repository/knex-message.repository';
import { CreateMessageUsecase } from 'src/application/usecase/create-message';
import { DatabaseAdapter } from '../database/database.adapter';
import { PgVectorStore } from '../vector-store/pg-vector-store';

@Module({
  providers: [
    MessagesResolver,
    {
      provide: 'MessageRepository',
      useClass: KnexMessageRepository,
    },
    CreateMessageUsecase,
    DatabaseAdapter,
    {
      provide: 'VectorStore',
      useClass: PgVectorStore,
    },
  ],
})
export class MessagesModule {}
