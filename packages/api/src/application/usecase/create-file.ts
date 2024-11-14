import { Inject, Injectable } from '@nestjs/common';
import { CreateFileInput } from 'src/domain/dto/create-file.input';
import { VectorStoreFacade } from '../service/vector-store.facade';
import FileRepository from '../repository/file.repository';
import { File } from 'src/domain/entities/file.entity';
import * as path from 'path';
import * as fs from 'fs';
import EPub from 'epub';
import { ReadStream } from 'fs-capacitor';

@Injectable()
export class CreateFileUsecase {
  constructor(
    @Inject('FileRepository')
    private readonly fileRepository: FileRepository,
    private readonly vectorStoreFacade: VectorStoreFacade,
  ) {}

  async execute(createFileInput: CreateFileInput) {
    const uploadedFile = await createFileInput.file;

    const fileStream = uploadedFile.createReadStream();
    const content = (await this.readEpubFromStream(
      fileStream,
    )) as Array<string>;

    const file = File.create(
      uploadedFile.filename,
      createFileInput.size,
      this.cleanHTML(content.join(' ')),
    );

    await this.vectorStoreFacade.processAndStoreDocument(file.content, file.id);
    return this.fileRepository.create(file);
  }

  async readEpubFromStream(readStream: ReadStream) {
    const tempFilePath = path.join(__dirname, 'temp.epub');
    const writeStream = fs.createWriteStream(tempFilePath);

    await new Promise((resolve, reject) => {
      readStream.pipe(writeStream);
      readStream.on('end', resolve);
      readStream.on('error', reject);
      writeStream.on('error', reject);
    });

    const epub = new EPub(tempFilePath);
    await new Promise((resolve, reject) => {
      epub.on('end', resolve);
      epub.on('error', reject);
      epub.parse();
    });

    const chaptersContent = await Promise.all(
      epub.flow.map((chapter) => {
        return new Promise((resolveChapter, rejectChapter) => {
          epub.getChapter(chapter.id, (error, text) => {
            if (error) {
              rejectChapter(error);
            } else {
              resolveChapter(text);
            }
          });
        });
      }),
    );

    return chaptersContent;
  }

  cleanHTML(html: string) {
    return html.replace(/<[^>]*>/g, '');
  }
}
