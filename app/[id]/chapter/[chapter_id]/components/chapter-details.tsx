'use client';

import {Pending} from '@/app/components/pending';
import {EmptyList} from '@/components/shared/empty-list';
import {ErrorComponent} from '@/components/shared/error';
import {useChapterDispatch, useChapterSelector} from '@/lib/redux/chapter/chapter-hooks';
import {
  fetchChapter,
  resetChapterState,
  setChapterError,
} from '@/lib/redux/chapter/slices/chapter.slice';
import {API_URI} from '@/lib/shared/constants';
import {useEffect, useRef} from 'react';

export const ChapterDetails = ({comic_id, chapter_id}: {comic_id: number; chapter_id: number}) => {
  const dispatch = useChapterDispatch();
  const {status, error, chapter} = useChapterSelector((state) => state.chapterReducer);
  const init = useRef(false);

  useEffect(() => {
    if (init.current) return;
    init.current = true;

    const parsedComicId = Number(comic_id);
    const parsedChapterId = Number(chapter_id);

    if (isNaN(parsedComicId) || isNaN(parsedChapterId)) {
      dispatch(setChapterError('The comic id or chapter id params must be a number'));
      return;
    }

    dispatch(fetchChapter({comic_id: parsedComicId, chapter_id: parsedChapterId}));
  });

  useEffect(() => {
    // on comic page unmounted, reset state
    return () => {
      dispatch(resetChapterState());
    };
  }, [dispatch]);

  if (status === 'error' && error !== null) {
    return (
      <div className="w-full h-6/12 flex items-center justify-center">
        <ErrorComponent error={error} />
      </div>
    );
  }

  return (
    <>
      {status === 'pending' || chapter === null ? (
        <div className="w-full h-6/12 flex items-center justify-center">
          <Pending />
        </div>
      ) : (
        <div className="px-5 flex flex-col gap-2 w-full h-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Chapter - {chapter.chap}</h1>
            <span>{chapter.title ?? <span className="italic">No title in there</span>}</span>
          </div>
          <ul className="flex-1 overflow-scroll">
            {chapter.images && chapter.images.length !== 0 ? (
              chapter.images.map((ch, i) => {
                return (
                  <li key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="max-w-full"
                      src={API_URI + '/images/medias/' + comic_id + '/' + chapter_id + '/' + ch.url}
                      loading="lazy"
                      alt={ch.id}
                    ></img>
                  </li>
                );
              })
            ) : (
              <div className="w-full flex items-center justify-center">
                <div className="w-6/12">
                  <EmptyList
                    title="No images"
                    description="There's no image for this chapter, maybe that's a problem"
                  />
                </div>
              </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
};
