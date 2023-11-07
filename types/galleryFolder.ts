export interface IFolderDto {
  name: string,
  nested: IFolderDto[] | null,
}

export interface IFolder extends IFolderDto {
  images: string[]
}
