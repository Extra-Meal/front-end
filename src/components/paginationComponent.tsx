import { useSearchParams } from "react-router";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  totalPages: number | undefined;
};

export default function PaginationComponent({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page") as string, 10) : 1;
  const isNextPageAvailable = currentPage < (totalPages || 0);
  const isPreviousPageAvailable = currentPage > 1;
  function handlePageChange(page: number) {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleNextPage() {
    const nextPage = currentPage + 1;
    if (nextPage <= (totalPages || 0)) {
      handlePageChange(nextPage);
    }
  }
  function handlePreviousPage() {
    const prevPage = currentPage - 1;
    if (prevPage > 0) {
      handlePageChange(prevPage);
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        {isPreviousPageAvailable && (
          <PaginationItem>
            <PaginationPrevious
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handlePreviousPage();
              }}
            />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages || 0 }, (_, index) => {
          const pageNumber = index + 1;
          const isInRange =
            pageNumber === currentPage || // current
            pageNumber === currentPage - 1 || // previous
            (pageNumber > currentPage && pageNumber <= currentPage + 2); // next two

          return isInRange ? (
            <PaginationItem key={index}>
              <PaginationLink
                to="#"
                isActive={currentPage === pageNumber}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ) : null;
        })}
        {totalPages && totalPages > 5 && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {isNextPageAvailable && (
          <PaginationItem>
            <PaginationNext
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handleNextPage();
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
