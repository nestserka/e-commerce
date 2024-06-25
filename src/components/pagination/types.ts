export interface PaginationBlockProps {
  page: number;
  total: number;
  defaultPageSize: number;
  handleChangePage: (pageNumber: number) => void;
}
