import { Document } from '@langchain/core/documents';

export default interface VectorStore {
  load(text: string, file_id: string): Document;
  split(document: Document): Promise<Document[]>;
  store(documents: Document[]): Promise<void>;
}
