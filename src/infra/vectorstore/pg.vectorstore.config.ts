import { PoolConfig } from 'pg';
import { ConfigService } from '@nestjs/config';
import { DistanceStrategy } from '@langchain/community/vectorstores/pgvector';

export function getVectorStoreConfig(configService: ConfigService) {
  return {
    postgresConnectionOptions: {
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      user: configService.get<string>('DATABASE_USER'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
    } as PoolConfig,
    tableName: 'vector_table',
    columns: {
      idColumnName: 'id',
      vectorColumnName: 'vector',
      contentColumnName: 'content',
      metadataColumnName: 'metadata',
    },
    distanceStrategy: 'cosine' as DistanceStrategy,
  };
}

export function getBedrockEmbeddingsConfig(configService: ConfigService) {
  return {
    region: configService.get<string>('AWS_REGION'),
    credentials: {
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    },
    model: 'amazon.titan-embed-text-v1',
  };
}

export function getBedrockChatConfig(configService: ConfigService) {
  return {
    region: configService.get<string>('AWS_REGION'),
    credentials: {
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    },
    model: 'anthropic.claude-3-sonnet-20240229-v1:0',
    temperature: 0.2,
  };
}
