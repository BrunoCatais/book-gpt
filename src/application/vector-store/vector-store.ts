import { BaseChatModel } from '@langchain/core/dist/language_models/chat_models';
import { Document } from '@langchain/core/documents';
import { PromptTemplate } from '@langchain/core/prompts';
import { RetrievalQAChain } from 'langchain/chains';

export default interface VectorStore {
  load(text: string, file_id: string): Document;
  split(document: Document): Promise<Document[]>;
  store(documents: Document[]): Promise<void>;
  createChat(): BaseChatModel;
  createPrompt(): PromptTemplate;
  createChain(chat: BaseChatModel, prompt: PromptTemplate): RetrievalQAChain;
  invokeChain(chain: RetrievalQAChain, message: string): Promise<string>;
}
