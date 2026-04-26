'use client';

import {setPage, nextPage, previousPage} from '@/lib/redux/slices/media-list-slice';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';

export const Paginator = () => {
  const dispatch = useAppDispatch();
  const {page} = useAppSelector((state) => state.mediaList);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page <= 1}
            className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            onClick={() => {
              dispatch(previousPage());
            }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => {
              dispatch(setPage(1));
            }}
          >
            first
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="cursor-pointer active text-secondary-background bg-secondary hover:bg-secondary3 dark:hover:bg-secondary5"
            onClick={() => {
              dispatch(setPage(page));
            }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => {
              dispatch(setPage(page + 1));
            }}
          >
            {page + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => {
              dispatch(setPage(page + 2));
            }}
          >
            {page + 2}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => {
              dispatch(nextPage());
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
