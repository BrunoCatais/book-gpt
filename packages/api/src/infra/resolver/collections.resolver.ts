import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { CreateCollectionUsecase } from 'src/application/usecase/create-collection';
import { FindAllCollectionsUsecase } from 'src/application/usecase/find-all-collections';
import { FindAllFilesByCollectionIdUsecase } from 'src/application/usecase/find-all-files-by-collection-id';
import { FindAllMessagesByCollectionIdUsecase } from 'src/application/usecase/find-all-messages-by-collection-id';
import { FindCollectionByIdUsecase } from 'src/application/usecase/find-collection-by-id';
import { CreateCollectionInput } from 'src/domain/dto/create-collection.input';
import { Collection } from 'src/domain/entities/collection.entity';

@Resolver(() => Collection)
export class CollectionsResolver {
  constructor(
    private readonly createCollectionUsecase: CreateCollectionUsecase,
    private readonly findAllCollectionsUsecase: FindAllCollectionsUsecase,
    private readonly findAllFilesByCollectionIdUsecase: FindAllFilesByCollectionIdUsecase,
    private readonly findCollectionByIdUsecase: FindCollectionByIdUsecase,
    private readonly findAllMessagesByCollectionIdUsecase: FindAllMessagesByCollectionIdUsecase,
  ) {}

  @Query(() => [Collection], { name: 'collections' })
  findAll() {
    return this.findAllCollectionsUsecase.execute();
  }

  @Query(() => Collection, { name: 'collection' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.findCollectionByIdUsecase.execute(id);
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

  @ResolveField()
  messages(@Parent() collection: Collection) {
    return this.findAllMessagesByCollectionIdUsecase.execute(collection.id);
  }
}
