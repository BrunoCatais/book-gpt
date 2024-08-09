import { ObjectType, Field, ID } from '@nestjs/graphql';

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
}
