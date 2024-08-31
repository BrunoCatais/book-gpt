import { Inject, Injectable } from '@nestjs/common';
import VectorStore from '../vector-store/vector-store';

@Injectable()
export class VectorStoreFacade {
  constructor(
    @Inject('VectorStore')
    private readonly vectorStore: VectorStore,
  ) {}

  async processAndStoreDocument(
    content: string,
    fileId: string,
  ): Promise<void> {
    const document = this.vectorStore.load(content, fileId);
    const splittedDocument = await this.vectorStore.split(document);
    await this.vectorStore.store(splittedDocument);
  }
}
