import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DeepPartial } from '@apollo/client/utilities';
import { firstValueFrom } from 'rxjs';
import { File, GetFileGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class ChatComponent implements OnChanges {
  @Input({ required: true }) id!: string;
  file: DeepPartial<File> | null = null;

  constructor(
    private readonly getFileGQL: GetFileGQL,
  ) {}

  async ngOnChanges(): Promise<void> {
    const response = await firstValueFrom(this.getFileGQL.fetch({ id: this.id }));
    this.file = response.data.file;
  }
}
