import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Collection = {
  __typename?: 'Collection';
  /** The color of the collection */
  color: Scalars['String']['output'];
  /** The creation date of the collection */
  created_at: Scalars['DateTime']['output'];
  /** The files of the collection */
  files: Array<File>;
  /** The id of the collection */
  id: Scalars['ID']['output'];
  /** The name of the collection */
  name: Scalars['String']['output'];
};

export type CreateCollectionInput = {
  /** The color of the collection */
  color: Scalars['String']['input'];
  /** The name of the collection */
  name: Scalars['String']['input'];
};

export type CreateFileInput = {
  file: Scalars['Upload']['input'];
  size: Scalars['Float']['input'];
};

export type CreateMessageInput = {
  /** Collection id */
  collectionId?: InputMaybe<Scalars['ID']['input']>;
  /** File id */
  fileId?: InputMaybe<Scalars['ID']['input']>;
  /** Message to create */
  message: Scalars['String']['input'];
};

export type File = {
  __typename?: 'File';
  /** The collection id of the file */
  collection_id?: Maybe<Scalars['ID']['output']>;
  /** The content of the file */
  content: Scalars['String']['output'];
  /** The creation date of the file */
  created_at: Scalars['DateTime']['output'];
  /** The id of the file */
  id: Scalars['ID']['output'];
  /** The messages of the file */
  messages: Array<Message>;
  /** The name of the file */
  name: Scalars['String']['output'];
  /** The size of the file */
  size: Scalars['Float']['output'];
};

export type Message = {
  __typename?: 'Message';
  /** The id of the associated collection */
  collection_id: Scalars['String']['output'];
  /** The creation date of the message */
  created_at: Scalars['DateTime']['output'];
  /** The id of the associated file */
  file_id: Scalars['String']['output'];
  /** The id of the message */
  id: Scalars['ID']['output'];
  /** The message */
  message: Scalars['String']['output'];
  /** The source of the message */
  source: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCollection: Collection;
  createFile: File;
  createMessage: Message;
  moveFile: File;
  removeFile: File;
};


export type MutationCreateCollectionArgs = {
  createCollectionInput: CreateCollectionInput;
};


export type MutationCreateFileArgs = {
  createFileInput: CreateFileInput;
};


export type MutationCreateMessageArgs = {
  createMessageInput: CreateMessageInput;
};


export type MutationMoveFileArgs = {
  collectionId?: InputMaybe<Scalars['ID']['input']>;
  fileId: Scalars['ID']['input'];
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  collections: Array<Collection>;
  file: File;
  files: Array<File>;
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};

export type GetFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilesQuery = { __typename?: 'Query', files: Array<{ __typename?: 'File', id: string, name: string, size: number, created_at: any }> };

export type GetCollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string, name: string, color: string, created_at: any, files: Array<{ __typename?: 'File', id: string, name: string, size: number, created_at: any }> }> };

export type GetFileQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFileQuery = { __typename?: 'Query', file: { __typename?: 'File', id: string, name: string, size: number, created_at: any, collection_id?: string | null, messages: Array<{ __typename?: 'Message', id: string, message: string, source: string, created_at: any }> } };

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: string, message: string, source: string, created_at: any } };

export type CreateCollectionMutationVariables = Exact<{
  input: CreateCollectionInput;
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'Collection', id: string, name: string, color: string, created_at: any } };

export type MoveFileMutationVariables = Exact<{
  fileId: Scalars['ID']['input'];
  collectionId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type MoveFileMutation = { __typename?: 'Mutation', moveFile: { __typename?: 'File', id: string, name: string, size: number, created_at: any, collection_id?: string | null } };

export const GetFilesDocument = gql`
    query getFiles {
  files {
    id
    name
    size
    created_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetFilesGQL extends Apollo.Query<GetFilesQuery, GetFilesQueryVariables> {
    document = GetFilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCollectionsDocument = gql`
    query getCollections {
  collections {
    id
    name
    color
    created_at
    files {
      id
      name
      size
      created_at
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCollectionsGQL extends Apollo.Query<GetCollectionsQuery, GetCollectionsQueryVariables> {
    document = GetCollectionsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetFileDocument = gql`
    query getFile($id: ID!) {
  file(id: $id) {
    id
    name
    size
    created_at
    collection_id
    messages {
      id
      message
      source
      created_at
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetFileGQL extends Apollo.Query<GetFileQuery, GetFileQueryVariables> {
    document = GetFileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateMessageDocument = gql`
    mutation createMessage($input: CreateMessageInput!) {
  createMessage(createMessageInput: $input) {
    id
    message
    source
    created_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateMessageGQL extends Apollo.Mutation<CreateMessageMutation, CreateMessageMutationVariables> {
    document = CreateMessageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateCollectionDocument = gql`
    mutation createCollection($input: CreateCollectionInput!) {
  createCollection(createCollectionInput: $input) {
    id
    name
    color
    created_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCollectionGQL extends Apollo.Mutation<CreateCollectionMutation, CreateCollectionMutationVariables> {
    document = CreateCollectionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const MoveFileDocument = gql`
    mutation moveFile($fileId: ID!, $collectionId: ID) {
  moveFile(fileId: $fileId, collectionId: $collectionId) {
    id
    name
    size
    created_at
    collection_id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MoveFileGQL extends Apollo.Mutation<MoveFileMutation, MoveFileMutationVariables> {
    document = MoveFileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }