import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateCollectionUsecase } from 'src/application/usecase/create-collection';
import { CreateCollectionInput } from 'src/domain/dto/create-collection.input';
import { Collection } from 'src/domain/entities/collection.entity';

@Resolver(() => Collection)
export class CollectionsResolver {
  constructor(
    private readonly createCollectionUsecase: CreateCollectionUsecase,
  ) {}

  @Mutation(() => Collection)
  createCollection(
    @Args('createCollectionInput') createCollectionInput: CreateCollectionInput,
  ) {
    return this.createCollectionUsecase.execute(createCollectionInput);
  }
}
