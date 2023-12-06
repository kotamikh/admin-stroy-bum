export interface ISubjectDto {
  name: string;
  image: string;
}

export interface ISubject extends ISubjectDto {
  id: number;
}

export interface IBrand {
  id: number;
  name: string;
}
