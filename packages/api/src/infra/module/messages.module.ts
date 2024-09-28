import { Module } from '@nestjs/common';
import { MessagesResolver } from '../resolver/messages.resolver';
import { KnexMessageRepository } from '../repository/knex-message.repository';
import { CreateMessageUsecase } from 'src/application/usecase/create-message';
import { DatabaseAdapter } from '../database/database.adapter';
import { VectorStoreModule } from './vector-store.module';

@Module({
  providers: [
    MessagesResolver,
    {
      provide: 'MessageRepository',
      useClass: KnexMessageRepository,
    },
    CreateMessageUsecase,
    DatabaseAdapter,
  ],
  imports: [VectorStoreModule],
})
export class MessagesModule {}
