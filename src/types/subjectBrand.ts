export interface ISubjectDto {
  name: string;
  image: string;
  parentId: number;
}

export interface ISubject extends ISubjectDto {
  id: number;
}

export interface IBrand {
  id: number;
  name: string;
}
