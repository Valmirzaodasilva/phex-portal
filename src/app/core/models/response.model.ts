export interface ResponseModel<T> {
  success: boolean;
  message?: string;
  response: T;
}
