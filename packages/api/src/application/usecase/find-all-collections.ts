import { Inject, Injectable } from '@nestjs/common';
import CollectionRepository from '../repository/collection.repository';

@Injectable()
export class FindAllCollectionsUsecase {
  constructor(
    @Inject('CollectionRepository')
    private readonly collectionRepository: CollectionRepository,
  ) {}

  async execute() {
    return this.collectionRepository.findAll();
  }
}
