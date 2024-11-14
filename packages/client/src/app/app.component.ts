import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Collection as CollectionGQL, File as FileGQL, GetCollectionsGQL, GetFilesGQL, MoveFileGQL } from 'src/generated/graphql';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NewCollectionComponent } from './new-collection/new-collection.component';
import { DeepPartial } from '@apollo/client/utilities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  chats: DeepPartial<FileGQL>[] = [];
  collections: DeepPartial<CollectionGQL>[] = [];
  isLoading = false;

  selectedChatId: string | null = null;
  selectedCollectionId: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private readonly getCollectionsGQL: GetCollectionsGQL,
    private readonly getFilesGQL: GetFilesGQL,
    private readonly http: HttpClient,
    private readonly matDialog: MatDialog,
    private readonly moveFileGQL: MoveFileGQL
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fetchFilesAndCollections();
  }

  openNewCollectionDialog() {
    this.matDialog.open(NewCollectionComponent);
  }

  async moveFileToCollection(collectionId: string | null) {
    if (!this.selectedChatId) return;
    await firstValueFrom(
      this.moveFileGQL.mutate({
        fileId: this.selectedChatId,
        collectionId
      })
    )
    this.fetchFilesAndCollections();
    this.selectedChatId = null;
    this.selectedCollectionId = null;
  }

  onOpenCollection(event: Event, id?: string): void {
    event.stopPropagation();
    if (!id) return;
    if (this.selectedCollectionId === id) {
      this.selectedCollectionId = null;
      this.selectedChatId = null;
      return;
    }
    this.selectedCollectionId = id;
  }

  onSelectCollection(id?: string): void {
    if (!id) return;
    if (this.selectedCollectionId === id) {
      this.selectedChatId = null;
      return;
    }
    this.selectedChatId = null;
    this.selectedCollectionId = id;
  }

  onSelectChat(id?: string): void {
    if (!id) return;
    this.selectedChatId = id;
  }

  async fetchFilesAndCollections() {
    this.isLoading = true;
    await this.fetchFiles();
    await this.fetchCollections();
    this.isLoading = false;
  }

  async fetchCollections() {
    const response = await firstValueFrom(this.getCollectionsGQL.fetch({}, { fetchPolicy: 'no-cache' }));
    const collections = response.data.collections;
    this.collections = collections;
  }

  async fetchFiles() {
    const response = await firstValueFrom(this.getFilesGQL.fetch({}, { fetchPolicy: 'no-cache' }));
    const files = response.data.files;
    this.chats = files;
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
    await this.upload(this.selectedFile);
    this.selectedFile = null;
    await this.fetchFilesAndCollections();
  }

  async upload(file: any) {
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
          size: this.selectedFile?.size
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
    this.isLoading = true;
    await firstValueFrom(
      this.http.post('http://localhost:3000/graphql', formData, { headers })
    );
  }

  get collectionFiles(): DeepPartial<FileGQL>[] {
    const selectedCollection = this.collections.find((collection) => collection.id === this.selectedCollectionId);
    if (!selectedCollection?.files) return [];
    return selectedCollection.files.filter((file): file is DeepPartial<FileGQL> => file !== undefined);
  }
}
