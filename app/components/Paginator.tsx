'use client';

import {setPage, nextPage, previousPage} from '@/lib/redux/slices/media-list.slice';
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
            className="cursor-pointer active bg-blue-500 text-white hover:bg-blue-300"
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
