'use client';

import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {fetchMedias, clearError} from '@/lib/redux/slices/mediaSlice';
import {Spinner} from '@/components/ui/spinner';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {Brackets, Frown} from 'lucide-react';

export function MediaList() {
  const dispatch = useAppDispatch();
  const {comics, loading, error, status} = useAppSelector((state) => state.media);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMedias({}));
    }
  }, [dispatch, status]);

  if (loading) {
    return (
      <div className="w-full h-100 flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>Error: {error}</p>
        <button
          onClick={() => dispatch(clearError())}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Medias</h1>
      {comics.length === 0 ? (
        <div className="w-full flex items-center justify-center h-100">
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Brackets />
              </EmptyMedia>
              <EmptyTitle>No comic</EmptyTitle>
              <EmptyDescription>No comic found</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2 items-center">
                Nothing to see here <Frown />
              </div>
            </EmptyContent>
          </Empty>
        </div>
      ) : (
        <ul className="space-y-2">
          {comics.map((comic) => (
            <li key={comic.id} className="h-fit p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">ID: {comic.id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
