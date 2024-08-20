import { Module } from '@nestjs/common';
import { MessagesResolver } from '../resolver/messages.resolver';
import { KnexMessageRepository } from '../repository/knex.message.repository';
import { CreateMessageUsecase } from 'src/application/usecase/create.message';
import { DatabaseAdapter } from '../database/database.adapter';

@Module({
  providers: [
    MessagesResolver,
    KnexMessageRepository,
    CreateMessageUsecase,
    DatabaseAdapter,
  ],
})
export class MessagesModule {}