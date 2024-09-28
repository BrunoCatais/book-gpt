import { Collection } from 'src/domain/entities/collection.entity';

export default interface CollectionRepository {
  create(collection: Collection): Promise<Collection>;
}
