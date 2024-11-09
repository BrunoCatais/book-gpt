import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { File, GetFilesGQL } from 'src/generated/graphql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  chats: Partial<File>[] = [];
  selectedChatId: string | null = null;

  constructor(private readonly getFilesGQL: GetFilesGQL) {}

  async ngOnInit(): Promise<void> {
    const response = await firstValueFrom(this.getFilesGQL.fetch());
    const files = response.data.files;
    this.chats = files;
  }

  onSelect(id?: string): void {
    if (!id) return;
    this.selectedChatId = id;
  }
}
