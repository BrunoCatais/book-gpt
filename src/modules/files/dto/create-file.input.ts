import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFileInput {
  @Field(() => String, { description: 'The name of the file' })
  name: string;

  @Field(() => Int, { description: 'The size of the file' })
  size: number;

  @Field(() => String, { description: 'The content of the file' })
  content: string;
}
