import { Inject, Injectable } from '@nestjs/common';
import { CreateCollectionInput } from 'src/domain/dto/create-collection.input';
import { Collection } from 'src/domain/entities/collection.entity';
import CollectionRepository from '../repository/collection.repository';

@Injectable()
export class CreateCollectionUsecase {
  constructor(
    @Inject('CollectionRepository')
    private readonly collectionRepository: CollectionRepository,
  ) {}

  async execute(createCollectionInput: CreateCollectionInput) {
    const collection = Collection.create(
      createCollectionInput.name,
      createCollectionInput.color,
    );

    return this.collectionRepository.create(collection);
  }
}
