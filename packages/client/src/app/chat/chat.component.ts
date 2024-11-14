import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeepPartial } from '@apollo/client/utilities';
import { firstValueFrom } from 'rxjs';
import { IconButtonComponent } from 'src/common/components/icon-button/icon-button.component';
import { Collection, CreateMessageGQL, File, GetCollectionGQL, GetFileGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, IconButtonComponent],
  standalone: true,
})
export class ChatComponent implements OnChanges, AfterViewChecked {
  @Input() fileId!: string;
  @Input() collectionId!: string;
  file: DeepPartial<File> | null = null;
  collection: DeepPartial<Collection> | null = null;

  message = new FormControl<string | null>('', { validators: [ Validators.minLength(3), Validators.required ] });
  isLoading = false;

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor(
    private readonly getFileGQL: GetFileGQL,
    private readonly getCollectionGQL: GetCollectionGQL,
    private readonly createMessageGQL: CreateMessageGQL,
  ) {}

  async ngOnChanges(): Promise<void> {
    if (!this.fileId && !this.collectionId) return;
    await this.fetchMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  async createMessage(): Promise<void> {
    if (!this.message.valid) return;
    const newMessage = { message: this.message.value!, source: 'user', created_at: new Date().toISOString() };
    this.file = {
        ...this.file,
        messages: [...(this.file?.messages || this.collection?.messages || []), newMessage]
    };
    this.message.reset();
    this.isLoading = true;
    const input = this.fileId ? { message: newMessage.message!, fileId: this.fileId } : { message: newMessage.message!, collectionId: this.collectionId };
    await firstValueFrom(this.createMessageGQL.mutate({ input }));
    await this.fetchMessages();
    this.isLoading = false;
  }

  async fetchMessages(): Promise<void> {
    if (this.fileId) {
      this.collection = null;
      const response = await firstValueFrom(this.getFileGQL.fetch({ id: this.fileId }, { fetchPolicy: 'no-cache' }));
      this.file = response.data.file;
      return;
    }
    this.file = null;
    const response = await firstValueFrom(this.getCollectionGQL.fetch({ id: this.collectionId }, { fetchPolicy: 'no-cache' }));
    this.collection = response.data.collection;
  }

  get messages(): DeepPartial<File>['messages'] | DeepPartial<Collection>['messages'] {
    return this.file?.messages || this.collection?.messages || [];
  }

  private scrollToBottom(): void {
    if (!this.messageContainer) return;
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }
}
