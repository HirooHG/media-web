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

const activeClassNames =
  'text-secondary-background bg-secondary hover:bg-secondary3 dark:hover:bg-secondary5 active';

export const Paginator = () => {
  const dispatch = useAppDispatch();
  const {page, lastPage} = useAppSelector((state) => state.mediaList);
  // Pagination does not move on the right, only the active case move
  // 1 -> 2, does not move, active case move
  // 2 -> 3, move, active case does not move
  const isStuck = page === 1;

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
            className={'cursor-pointer ' + (page !== 1 ? 'active' : '')}
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
            className={'cursor-pointer ' + (page === 1 ? activeClassNames : '')}
            onClick={() => {
              dispatch(setPage(isStuck ? page : page - 1));
            }}
          >
            {isStuck ? page : page - 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={'cursor-pointer ' + (page !== 1 ? activeClassNames : '')}
            onClick={() => {
              dispatch(setPage(isStuck ? page + 1 : page));
            }}
          >
            {isStuck ? page + 1 : page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-disabled={page >= (lastPage ?? 1)}
            className={page < (lastPage ?? 1) ? 'cursor-pointer' : 'pointer-events-none opacity-50'}
            onClick={() => {
              dispatch(setPage(isStuck ? page + 2 : page + 1));
            }}
          >
            {isStuck ? page + 2 : page + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={'cursor-pointer ' + (page !== 1 ? 'active' : '')}
            onClick={() => {
              dispatch(setPage(lastPage ?? 1));
            }}
          >
            last
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-disabled={page >= (lastPage ?? 1)}
            className={page < (lastPage ?? 1) ? 'cursor-pointer' : 'pointer-events-none opacity-50'}
            onClick={() => {
              dispatch(nextPage());
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
