import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCollectionInput {
  @Field(() => String, { description: 'The name of the collection' })
  name: string;

  @Field(() => String, { description: 'The color of the collection' })
  color: string;
}
