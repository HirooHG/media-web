'use client';

import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {fetchMedias, clearError} from '@/lib/redux/slices/mediaSlice';
import {Spinner} from '@/components/ui/spinner';

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Medias</h1>
      {comics.length === 0 ? (
        <p>List Empty</p>
      ) : (
        <ul className="space-y-2">
          {comics.map((comic) => (
            <li key={comic.id} className="p-3 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">ID: {comic.id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
