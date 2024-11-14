import { Inject, Injectable } from '@nestjs/common';
import MessageRepository from '../repository/message.repository';

@Injectable()
export class FindAllMessagesByCollectionIdUsecase {
  constructor(
    @Inject('MessageRepository')
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(collectionId: string) {
    return this.messageRepository.findAllByCollectionId(collectionId);
  }
}
