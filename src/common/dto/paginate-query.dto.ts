import { IsInt, Max, Min } from 'class-validator';

export class PaginateQuery {
  @IsInt()
  @Min(1)
  page = 1;

  @IsInt()
  @Min(1)
  @Max(100)
  pageSize = 20;

  get take() {
    return this.pageSize;
  }

  get skip() {
    return (this.page - 1) * this.pageSize;
  }
}
