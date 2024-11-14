import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeepPartial } from '@apollo/client/utilities';
import { firstValueFrom } from 'rxjs';
import { IconButtonComponent } from 'src/common/components/icon-button/icon-button.component';
import { CreateMessageGQL, File, GetFileGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, IconButtonComponent],
  standalone: true,
})
export class ChatComponent implements OnChanges, AfterViewChecked {
  @Input({ required: true }) id!: string;
  file: DeepPartial<File> | null = null;

  message = new FormControl<string | null>('', { validators: [ Validators.minLength(3), Validators.required ] });
  isLoading = false;

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor(
    private readonly getFileGQL: GetFileGQL,
    private readonly createMessageGQL: CreateMessageGQL,
  ) {}

  async ngOnChanges(): Promise<void> {
    if (!this.id) return;
    await this.fetchFile();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  async createMessage(): Promise<void> {
    if (!this.message.valid) return;
    const newMessage = { message: this.message.value!, source: 'user', created_at: new Date().toISOString() };
    this.file = {
        ...this.file,
        messages: [...(this.file?.messages || []), newMessage]
    };
    this.message.reset();
    this.isLoading = true;
    await firstValueFrom(this.createMessageGQL.mutate({ input: { message: newMessage.message!, fileId: this.file?.id } }));
    await this.fetchFile();
    this.isLoading = false;
  }

  async fetchFile(): Promise<void> {
    const response = await firstValueFrom(this.getFileGQL.fetch({ id: this.id }, { fetchPolicy: 'no-cache' }));
    this.file = response.data.file;
  }

  private scrollToBottom(): void {
    if (!this.messageContainer) return;
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }
}
