import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
export class File {
  private constructor(
    id: string,
    name: string,
    size: number,
    content: string,
    created_at: Date,
  ) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.content = content;
    this.created_at = created_at;
  }

  static create(name: string, size: number, content: string) {
    return new File(uuidv4(), name, size, content, new Date());
  }

  static restore(file: File) {
    return new File(
      file.id,
      file.name,
      file.size,
      file.content,
      file.created_at,
    );
  }

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
}
