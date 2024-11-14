import { Collection } from 'src/domain/entities/collection.entity';

export default interface CollectionRepository {
  create(collection: Collection): Promise<Collection>;
  findAll(): Promise<Collection[]>;
  findById(id: string): Promise<Collection | undefined>;
}
