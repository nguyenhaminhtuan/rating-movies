export class ApiResponse<T> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
