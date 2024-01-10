export interface ISubjectDto {
  name: string;
  image: string;
  parentId: number;
}

export interface ISubject extends ISubjectDto {
  id: number;
}

export interface ISubjectExtended extends ISubject {
  children: Array<number>;
}

export interface IBrand {
  id: number;
  name: string;
}
