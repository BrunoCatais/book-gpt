import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { Message } from './message.entity';

@ObjectType()
export class File {
  @Field(() => ID, { description: 'The id of the file' })
  id: string;

  @Field({ description: 'The name of the file' })
  name: string;

  @Field({ description: 'The size of the file' })
  size: number;

  @Field({ description: 'The content of the file' })
  content: string;

  @Field({ description: 'The creation date of the file' })
  created_at: Date;

  @Field(() => ID, {
    description: 'The collection id of the file',
    nullable: true,
  })
  collection_id?: string;

  @Field(() => [Message], { description: 'The messages of the file' })
  messages: Message[];

  private constructor(
    id: string,
    name: string,
    size: number,
    content: string,
    created_at: Date,
    collection_id: string,
  ) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.content = content;
    this.created_at = created_at;
    this.collection_id = collection_id;
  }

  static create(
    name: string,
    size: number,
    content: string,
    collection_id?: string,
  ) {
    return new File(uuidv4(), name, size, content, new Date(), collection_id);
  }

  static restore(file: File) {
    return new File(
      file.id,
      file.name,
      file.size,
      file.content,
      file.created_at,
      file.collection_id,
    );
  }
}
