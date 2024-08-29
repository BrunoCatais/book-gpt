import { Injectable } from '@nestjs/common';
import { Message } from 'src/domain/entities/message.entity';
import { CreateMessageInput } from 'src/domain/dto/create-message.input';
import { KnexMessageRepository } from 'src/infra/repository/knex-message.repository';
import { VectorStoreFacade } from '../service/vector-store.facade';

@Injectable()
export class CreateMessageUsecase {
  constructor(
    private readonly messageRepository: KnexMessageRepository,
    private readonly vectorStoreFacade: VectorStoreFacade,
  ) {
    this.messageRepository = messageRepository;
    this.vectorStoreFacade = vectorStoreFacade;
  }

  async execute(createMessageInput: CreateMessageInput) {
    const message = Message.create(
      createMessageInput.message,
      'user',
      createMessageInput.fileId,
      createMessageInput.collectionId,
    );
    const createdMessage = await this.messageRepository.create(message);

    const answer = await this.vectorStoreFacade.generateAnswer(
      createdMessage.message,
    );
    const answerMessage = Message.create(
      answer,
      'bot',
      createMessageInput.fileId,
      createMessageInput.collectionId,
    );
    await this.messageRepository.create(answerMessage);
    return answerMessage;
  }
}
