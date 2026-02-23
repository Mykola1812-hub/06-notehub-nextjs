import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.page}
      previousClassName={css.prev}
      nextClassName={css.next}
      breakClassName={css.break}
      disabledClassName={css.disabled}
      pageCount={totalPages}
      forcePage={page - 1}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      previousLabel="←"
      nextLabel="→"
    />
  );
}
