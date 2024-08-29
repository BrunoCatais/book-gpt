import { Document } from '@langchain/core/documents';
import { Injectable } from '@nestjs/common';
import VectorStore from 'src/application/vector-store/vector-store';
import { TokenTextSplitter } from 'langchain/text_splitter';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { BedrockEmbeddings } from '@langchain/aws';
import { ConfigService } from '@nestjs/config';
import { BedrockChat } from '@langchain/community/chat_models/bedrock';
import { PromptTemplate } from '@langchain/core/prompts';
import { RetrievalQAChain } from 'langchain/chains';
import {
  getBedrockChatConfig,
  getBedrockEmbeddingsConfig,
  getVectorStoreConfig,
} from './pg-vector-store.config';

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

  createChat(): BedrockChat {
    return new BedrockChat(getBedrockChatConfig(this.configService));
  }

  createPrompt(): PromptTemplate {
    return new PromptTemplate({
      template: `
        You are an assistant specialized in helping the user remember what happened in one or more books.
        Do not quote the excerpt directly, but rather answer the question in your own words.
        If you do not know the answer, just say that you do not know.
        Use the excerpts below to answer the questions.

        Excerpts:
        {context}

        Question:
        {question}
      `,
      inputVariables: ['context', 'question'],
    });
  }

  createChain(chat: BedrockChat, prompt: PromptTemplate): RetrievalQAChain {
    return RetrievalQAChain.fromLLM(chat, this.pgStore.asRetriever(), {
      prompt,
    });
  }

  async invokeChain(chain: RetrievalQAChain, message: string): Promise<string> {
    const result = await chain.invoke({ query: message });
    return result.text;
  }
}
