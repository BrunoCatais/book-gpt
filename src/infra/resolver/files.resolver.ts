import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CreateFileInput } from 'src/domain/dto/create-file.input';
import { File } from 'src/domain/entities/file.entity';
import { CreateFileUsecase } from 'src/application/usecase/create.file';
import { FindFileByIdUsecase } from 'src/application/usecase/find.file.by.id';
import { FindAllFilesUsecase } from 'src/application/usecase/find.all.files';
import { RemoveFileUsecase } from 'src/application/usecase/remove-file';

@Resolver(() => File)
export class FilesResolver {
  constructor(
    private readonly createFileUsecase: CreateFileUsecase,
    private readonly findFileByIdUsecase: FindFileByIdUsecase,
    private readonly findAllFilesUsecase: FindAllFilesUsecase,
    private readonly removeFileUsecase: RemoveFileUsecase,
  ) {}

  @Mutation(() => File)
  createFile(@Args('createFileInput') createFileInput: CreateFileInput) {
    return this.createFileUsecase.execute(createFileInput);
  }

  @Mutation(() => File)
  removeFile(@Args('id', { type: () => ID }) id: string) {
    return this.removeFileUsecase.execute(id);
  }

  @Query(() => [File], { name: 'files' })
  findAll() {
    return this.findAllFilesUsecase.execute();
  }

  @Query(() => File, { name: 'file' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.findFileByIdUsecase.execute(id);
  }
}
