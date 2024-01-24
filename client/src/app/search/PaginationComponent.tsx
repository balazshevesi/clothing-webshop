import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { parseAsInteger, useQueryState } from "nuqs";

export default function PaginationComponent() {
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const totalNumberOfPages = 3;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className=" cursor-pointer"
            onClick={() => setPage((ps) => (ps === 1 || !ps ? 1 : --ps))}
          />
        </PaginationItem>
        {[...Array(totalNumberOfPages)].map((item, i) => {
          return (
            <PaginationItem>
              <PaginationLink
                isActive={++i === page}
                className="cursor-pointer"
                onClick={() => setPage(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className=" cursor-pointer"
            onClick={() => setPage((ps) => (ps ? ++ps : 2))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
