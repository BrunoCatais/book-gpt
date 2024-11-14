import { Inject, Injectable } from '@nestjs/common';
import CollectionRepository from '../repository/collection.repository';

@Injectable()
export class FindCollectionByIdUsecase {
  constructor(
    @Inject('CollectionRepository')
    private readonly collectionRepository: CollectionRepository,
  ) {}

  async execute(id: string) {
    return this.collectionRepository.findById(id);
  }
}
