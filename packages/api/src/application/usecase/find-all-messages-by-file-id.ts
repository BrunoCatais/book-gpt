import { Inject, Injectable } from '@nestjs/common';
import MessageRepository from '../repository/message.repository';

@Injectable()
export class FindAllMessagesByFileIdUsecase {
  constructor(
    @Inject('MessageRepository')
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(fileId: string) {
    return this.messageRepository.findAllByFileId(fileId);
  }
}
