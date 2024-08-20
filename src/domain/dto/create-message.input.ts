import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => String, { description: 'Message to create' })
  message: string;

  @Field(() => ID, { description: 'File id', nullable: true })
  fileId: string;

  @Field(() => ID, { description: 'Collection id', nullable: true })
  collectionId: string;
}
