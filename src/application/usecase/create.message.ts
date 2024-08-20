import { Injectable } from '@nestjs/common';
import { Message } from 'src/domain/entities/message.entity';
import { CreateMessageInput } from 'src/domain/dto/create-message.input';
import { KnexMessageRepository } from 'src/infra/repository/knex.message.repository';

@Injectable()
export class CreateMessageUsecase {
  constructor(private readonly messageRepository: KnexMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute(createMessageInput: CreateMessageInput) {
    const message = Message.create(
      createMessageInput.message,
      'user',
      createMessageInput.fileId,
      createMessageInput.collectionId,
    );

    return this.messageRepository.create(message);
  }
}
