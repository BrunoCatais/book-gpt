import { Inject, Injectable } from '@nestjs/common';
import { Message } from 'src/domain/entities/message.entity';
import { CreateMessageInput } from 'src/domain/dto/create-message.input';
import MessageRepository from '../repository/message.repository';
import VectorStore from '../vector-store/vector-store';

@Injectable()
export class CreateMessageUsecase {
  constructor(
    @Inject('MessageRepository')
    private readonly messageRepository: MessageRepository,
    @Inject('VectorStore')
    private readonly vectorStore: VectorStore,
  ) {}

  async execute(createMessageInput: CreateMessageInput) {
    const message = Message.create(
      createMessageInput.message,
      'user',
      createMessageInput.fileId,
      createMessageInput.collectionId,
    );
    const createdMessage = await this.messageRepository.create(message);

    const answer = await this.vectorStore.invokeChain(createdMessage.message);
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
