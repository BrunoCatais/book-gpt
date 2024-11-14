import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Collection as CollectionGQL, File as FileGQL, GetCollectionsGQL, GetFilesGQL, MoveFileGQL } from 'src/generated/graphql';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeepPartial } from '@apollo/client/utilities';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private readonly getCollectionsGQL: GetCollectionsGQL,
    private readonly getFilesGQL: GetFilesGQL,
    private readonly http: HttpClient,
    private readonly moveFileGQL: MoveFileGQL
  ) {}

  async fetchCollections(): Promise<DeepPartial<CollectionGQL>[]> {
    const response = await firstValueFrom(this.getCollectionsGQL.fetch({}, { fetchPolicy: 'no-cache' }));
    return response.data.collections;
  }

  async fetchFiles(): Promise<DeepPartial<FileGQL>[]> {
    const response = await firstValueFrom(this.getFilesGQL.fetch({}, { fetchPolicy: 'no-cache' }));
    return response.data.files;
  }

  async moveFile(fileId: string, collectionId: string | null): Promise<void> {
    await firstValueFrom(
      this.moveFileGQL.mutate({
        fileId,
        collectionId
      })
    );
  }

  async upload(file: any, size: number): Promise<void> {
    const operations = {
      query: `
        mutation createFile($input: CreateFileInput!) {
          createFile(createFileInput: $input) {
            id
            content
          }
        }
      `,
      variables: {
        input: {
          file: null,
          size
        }
      }
    };

    const _map = {
      "0": ["variables.input.file"]
    };

    const formData = new FormData();
    formData.append('operations', JSON.stringify(operations));
    formData.append('map', JSON.stringify(_map));
    formData.append('0', file);

    const headers = new HttpHeaders({
      'x-apollo-operation-name': 'createFile'
    });

    await firstValueFrom(
      this.http.post('http://localhost:3000/graphql', formData, { headers })
    );
  }
}