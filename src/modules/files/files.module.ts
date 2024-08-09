import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesResolver } from './files.resolver';
import { DatabaseService } from 'src/infra/database.service';

@Module({
  providers: [FilesResolver, FilesService, DatabaseService],
})
export class FilesModule {}
