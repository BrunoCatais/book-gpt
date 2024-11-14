import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class CreateFileInput {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field()
  size: number;
}
