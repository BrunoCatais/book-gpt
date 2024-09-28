import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
export class Message {
  @Field(() => ID, { description: 'The id of the message' })
  id: string;

  @Field({ description: 'The message' })
  message: string;

  @Field({ description: 'The source of the message' })
  source: string;

  @Field({ description: 'The creation date of the message' })
  created_at: Date;

  @Field({ description: 'The id of the associated file' })
  file_id: string;

  @Field({ description: 'The id of the associated collection' })
  collection_id: string;

  private constructor(
    id: string,
    message: string,
    source: string,
    created_at: Date,
    file_id: string,
    collection_id: string,
  ) {
    this.id = id;
    this.message = message;
    this.source = source;
    this.created_at = created_at;
    this.file_id = file_id;
    this.collection_id = collection_id;
  }

  static create(
    message: string,
    source: string,
    file_id: string,
    collection_id: string,
  ) {
    if (!collection_id && !file_id) {
      throw new GraphQLError('Collection or file id are required');
    }

    return new Message(
      uuidv4(),
      message,
      source,
      new Date(),
      file_id,
      collection_id,
    );
  }

  static restore(message: Message) {
    return new Message(
      message.id,
      message.message,
      message.source,
      message.created_at,
      message.file_id,
      message.collection_id,
    );
  }
}
