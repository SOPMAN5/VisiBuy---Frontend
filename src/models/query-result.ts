export interface QueryResult<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }