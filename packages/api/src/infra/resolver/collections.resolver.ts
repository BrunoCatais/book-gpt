import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CreateCollectionUsecase } from 'src/application/usecase/create-collection';
import { FindAllCollectionsUsecase } from 'src/application/usecase/find-all-collections';
import { FindAllFilesByCollectionIdUsecase } from 'src/application/usecase/find-all-files-by-collection-id';
import { CreateCollectionInput } from 'src/domain/dto/create-collection.input';
import { Collection } from 'src/domain/entities/collection.entity';

@Resolver(() => Collection)
export class CollectionsResolver {
  constructor(
    private readonly createCollectionUsecase: CreateCollectionUsecase,
    private readonly findAllCollectionsUsecase: FindAllCollectionsUsecase,
    private readonly findAllFilesByCollectionIdUsecase: FindAllFilesByCollectionIdUsecase,
  ) {}

  @Query(() => [Collection], { name: 'collections' })
  findAll() {
    return this.findAllCollectionsUsecase.execute();
  }

  @Mutation(() => Collection)
  createCollection(
    @Args('createCollectionInput') createCollectionInput: CreateCollectionInput,
  ) {
    return this.createCollectionUsecase.execute(createCollectionInput);
  }

  @ResolveField()
  async files(@Parent() collection: Collection) {
    return this.findAllFilesByCollectionIdUsecase.execute(collection.id);
  }
}
