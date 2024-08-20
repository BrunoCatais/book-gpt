import { Message } from 'src/domain/entities/message.entity';

export default interface MessageRepository {
  create(message: Message): Promise<Message>;
  remove(id: string): Promise<Message | undefined>;
  findAll(): Promise<Message[]>;
}