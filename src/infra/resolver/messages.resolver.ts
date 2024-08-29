import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateMessageInput } from 'src/domain/dto/create-message.input';
import { CreateMessageUsecase } from 'src/application/usecase/create-message';
import { Message } from 'src/domain/entities/message.entity';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly createMessageUsecase: CreateMessageUsecase) {}

  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.createMessageUsecase.execute(createMessageInput);
  }
}
