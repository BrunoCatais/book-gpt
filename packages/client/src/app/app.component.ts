import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { File as FileGQL, GetFilesGQL } from 'src/generated/graphql';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  chats: Partial<FileGQL>[] = [];
  selectedChatId: string | null = null;
  selectedFile: File | null = null;
  isLoading = false;

  constructor(
    private readonly getFilesGQL: GetFilesGQL,
    private readonly http: HttpClient,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fetchFiles();
  }

  onSelect(id?: string): void {
    if (!id) return;
    this.selectedChatId = id;
  }

  async fetchFiles() {
    this.isLoading = true;
    const response = await firstValueFrom(this.getFilesGQL.fetch({}, { fetchPolicy: 'no-cache' }));
    const files = response.data.files;
    this.chats = files;
    this.isLoading = false;
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
    await this.upload(this.selectedFile);
    await this.fetchFiles();
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
          file: null
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
}
