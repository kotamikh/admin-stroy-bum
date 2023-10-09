export interface ICategoryDto {
  name: string;
  image: string;
}

export interface ICategory extends ICategoryDto {
  id: number;
}

export interface IBrand {
  id: number;
  name: string;
}
