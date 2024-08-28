import { Injectable } from '@nestjs/common';
import { PgVectorStore } from 'src/infra/vectorstore/pg.vectorstore';

@Injectable()
export class VectorStoreFacade {
  constructor(private readonly vectorStore: PgVectorStore) {}

  async processAndStoreDocument(
    content: string,
    fileId: string,
  ): Promise<void> {
    const document = this.vectorStore.load(content, fileId);
    const splittedDocument = await this.vectorStore.split(document);
    await this.vectorStore.store(splittedDocument);
  }

  async generateAnswer(chatInput: string): Promise<string> {
    const chat = this.vectorStore.createChat();
    const prompt = this.vectorStore.createPrompt();
    const chain = this.vectorStore.createChain(chat, prompt);
    return await this.vectorStore.invokeChain(chain, chatInput);
  }
}
