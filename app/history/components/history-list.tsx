'use client';

import {Pending} from '@/components/shared/pending';
import {ErrorComponent} from '@/components/shared/error';
import {useAppSelector} from '@/lib/redux/hooks';
import {EmptyList} from '@/components/shared/empty-list';
import {useGetMediaHistoryQuery} from '@/lib/redux/api';
import {Separator} from '@/components/ui/separator';
import {HistoryItem} from './history-item';
import {Button} from '@/components/ui/button';
import {useDispatch} from 'react-redux';
import {canSeeMore as canSeeMoreSelector, upLimit} from '@/lib/redux/slices/media-history-slice';

export const HistoryList = () => {
  const dispatch = useDispatch();
  const {history, error, status, limit} = useAppSelector((state) => state.mediaHistory);
  const canSeeMore = useAppSelector(canSeeMoreSelector);
  useGetMediaHistoryQuery(limit, {refetchOnMountOrArgChange: true});

  if (status !== 'succeeded')
    return (
      <div className="h-full flex items-center justify-center">
        {status === 'error' ? <ErrorComponent error={error} /> : <Pending />}
      </div>
    );

  return (
    <>
      {history.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div>
            <EmptyList title="History" description="The reading history is empty" />
          </div>
        </div>
      ) : (
        <div className="w-full overflow-auto">
          <Separator />
          <div className="py-4 grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex-wrap">
            {history.map((h, i) => (
              <HistoryItem key={i} history={h} />
            ))}
          </div>
          {canSeeMore && (
            <div className="w-full py-4 flex justify-center rounded-3xl!">
              <Button onClick={() => dispatch(upLimit())}>See More</Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
