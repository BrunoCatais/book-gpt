import { File } from 'src/domain/entities/file.entity';

export default interface FileRepository {
  create(file: File): Promise<File>;
  remove(id: string): Promise<File | undefined>;
  findById(id: string): Promise<File | undefined>;
  findAllWithoutCollection(): Promise<File[]>;
  findAllByCollectionId(collectionId: string): Promise<File[]>;
}
