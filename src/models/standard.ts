export interface StandardResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface StandardList<T> {
  data: T[];
  count?: number;
  total: number;
  page?: number;
  pageCount?: number;
}
