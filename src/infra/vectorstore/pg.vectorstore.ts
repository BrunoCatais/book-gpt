import { Document } from '@langchain/core/documents';
import { Injectable } from '@nestjs/common';
import VectorStore from 'src/application/vectorstore/vectorstore';
import { TokenTextSplitter } from 'langchain/text_splitter';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { BedrockEmbeddings } from '@langchain/aws';
import { ConfigService } from '@nestjs/config';
import {
  getBedrockEmbeddingsConfig,
  getVectorStoreConfig,
} from './pg.vectorstore.config';

@Injectable()
export class PgVectorStore implements VectorStore {
  splitter: TokenTextSplitter;
  pgStore: PGVectorStore;

  constructor(private readonly configService: ConfigService) {
    this.splitter = new TokenTextSplitter({
      encodingName: 'cl100k_base',
      chunkSize: 600,
      chunkOverlap: 0,
    });

    this.initializeStore();
  }

  private async initializeStore() {
    const vectorStoreConfig = getVectorStoreConfig(this.configService);
    const bedrockConfig = getBedrockEmbeddingsConfig(this.configService);

    this.pgStore = await PGVectorStore.initialize(
      new BedrockEmbeddings(bedrockConfig),
      vectorStoreConfig,
    );
  }

  load(text: string, file_id: string): Document {
    return new Document({ pageContent: text, metadata: { file_id } });
  }

  split(document: Document): Promise<Document[]> {
    return this.splitter.splitDocuments([document]);
  }

  store(documents: Document[]): Promise<void> {
    return this.pgStore.addDocuments(documents);
  }
}
