import { ApiResponse } from './response.dto';

export class ApiPaginateResponse<T> extends ApiResponse<T> {
  metadata: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
  };

  constructor({
    data,
    page,
    pageSize,
    totalCount,
  }: {
    data: T;
    page: number;
    pageSize: number;
    totalCount: number;
  }) {
    super(data);

    this.metadata = {
      page,
      pageSize,
      totalCount,
      totalPage: Math.ceil(totalCount / pageSize),
    };
  }
}
