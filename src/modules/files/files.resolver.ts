import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { File } from './entities/file.entity';
import { CreateFileInput } from './dto/create-file.input';

@Resolver(() => File)
export class FilesResolver {
  constructor(private readonly filesService: FilesService) {}

  @Mutation(() => File)
  createFile(@Args('createFileInput') createFileInput: CreateFileInput) {
    return this.filesService.create(createFileInput);
  }

  @Query(() => [File], { name: 'files' })
  findAll() {
    return this.filesService.findAll();
  }

  @Query(() => File, { name: 'file' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.filesService.findOne(id);
  }

  @Mutation(() => File)
  removeFile(@Args('id', { type: () => ID }) id: string) {
    return this.filesService.remove(id);
  }
}
