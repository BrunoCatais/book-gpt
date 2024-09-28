import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { FilesModule } from './infra/module/files.module';
import { ConfigModule } from '@nestjs/config';
import { VectorStoreModule } from './infra/module/vector-store.module';
import { MessagesModule } from './infra/module/messages.module';
import { CollectionsModule } from './infra/module/collections.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FilesModule,
    VectorStoreModule,
    MessagesModule,
    CollectionsModule,
  ],
  providers: [],
})
export class AppModule {}
