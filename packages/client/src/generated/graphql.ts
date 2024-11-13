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
};

export type Collection = {
  __typename?: 'Collection';
  /** The color of the collection */
  color: Scalars['String']['output'];
  /** The creation date of the collection */
  created_at: Scalars['DateTime']['output'];
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
  /** The content of the file */
  content: Scalars['String']['input'];
  /** The name of the file */
  name: Scalars['String']['input'];
  /** The size of the file */
  size: Scalars['Int']['input'];
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


export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  file: File;
  files: Array<File>;
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};

export type GetFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilesQuery = { __typename?: 'Query', files: Array<{ __typename?: 'File', id: string, name: string, size: number, created_at: any }> };

export type GetFileQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFileQuery = { __typename?: 'Query', file: { __typename?: 'File', id: string, name: string, size: number, created_at: any, messages: Array<{ __typename?: 'Message', id: string, message: string, source: string, created_at: any }> } };

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: string, message: string, source: string, created_at: any } };

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
export const GetFileDocument = gql`
    query getFile($id: ID!) {
  file(id: $id) {
    id
    name
    size
    created_at
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