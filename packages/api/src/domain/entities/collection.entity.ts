import { ObjectType, Field, ID } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { File } from './file.entity';

@ObjectType()
export class Collection {
  @Field(() => ID, { description: 'The id of the collection' })
  id: string;

  @Field({ description: 'The name of the collection' })
  name: string;

  @Field({ description: 'The color of the collection' })
  color: string;

  @Field({ description: 'The creation date of the collection' })
  created_at: Date;

  @Field(() => [File!], { description: 'The files of the collection' })
  files: File[];

  private constructor(
    id: string,
    name: string,
    color: string,
    created_at: Date,
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.created_at = created_at;
  }

  static create(name: string, color: string) {
    return new Collection(uuidv4(), name, color, new Date());
  }

  static restore(collection: Collection) {
    return new Collection(
      collection.id,
      collection.name,
      collection.color,
      collection.created_at,
    );
  }
}
