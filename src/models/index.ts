export interface StandardResponse<T> {
  code: number;
  message: string;
  data: T;
}
