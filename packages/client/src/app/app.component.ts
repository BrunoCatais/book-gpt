import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCollectionComponent } from './new-collection/new-collection.component';
import { DeepPartial } from '@apollo/client/utilities';
import { AppService } from './app.service';
import { Collection as CollectionGQL, File as FileGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  chats: DeepPartial<FileGQL>[] = [];
  collections: DeepPartial<CollectionGQL>[] = [];
  isLoading = false;

  openedCollectionId: string | null = null;
  selectedChatId: string | null = null;
  selectedCollectionId: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private readonly appService: AppService,
    private readonly matDialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fetchFilesAndCollections();
  }

  openNewCollectionDialog() {
    const dialog = this.matDialog.open(NewCollectionComponent);
    dialog.afterClosed().subscribe(() => this.fetchFilesAndCollections())
  }

  async moveFileToCollection(collectionId: string | null) {
    if (!this.selectedChatId) return;
    await this.appService.moveFile(this.selectedChatId, collectionId);
    await this.fetchFilesAndCollections();
    this.selectedChatId = null;
    this.selectedCollectionId = null;
  }

  onOpenCollection(event: Event, id?: string): void {
    event.stopPropagation();
    if (!id) return;
    if (this.openedCollectionId === id) {
      this.openedCollectionId = null;
      this.selectedChatId = null;
      return;
    }
    this.openedCollectionId = id;
  }

  onSelectCollection(id?: string): void {
    if (!id) return;
    this.openedCollectionId = id;
    this.selectedCollectionId = id;
    this.selectedChatId = null;
  }

  onSelectChat(id?: string): void {
    if (!id) return;
    this.selectedChatId = id;
    this.selectedCollectionId = null;

    if (this.openedCollectionId && !this.collectionFiles.find((file) => file.id === id)) {
      this.openedCollectionId = null;
    }
  }

  async fetchFilesAndCollections() {
    this.isLoading = true;
    this.chats = await this.appService.fetchFiles();
    this.collections = await this.appService.fetchCollections();
    this.isLoading = false;
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
    this.isLoading = true;
    await this.appService.upload(this.selectedFile, this.selectedFile!.size);
    this.selectedFile = null;
    await this.fetchFilesAndCollections();
  }

  get collectionFiles(): DeepPartial<FileGQL>[] {
    const openedCollection = this.collections.find((collection) => collection.id === this.openedCollectionId);
    if (!openedCollection?.files) return [];
    return openedCollection.files.filter((file): file is DeepPartial<FileGQL> => file !== undefined);
  }
}