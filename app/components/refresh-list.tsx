'use client';

import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {refreshMedias} from '@/lib/redux/slices/media-list.slice';
import {ComicStatus} from '@/lib/shared/models/comic-status';
import {RefreshCw} from 'lucide-react';

export const RefreshList = () => {
  const dispatch = useAppDispatch();
  const {page, per_page, status, selectedStatus} = useAppSelector((state) => state.mediaList);

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={() => {
          const status = selectedStatus === null ? null : ComicStatus[selectedStatus];

          dispatch(refreshMedias({page, per_page, selectedStatus: status}));
        }}
        disabled={status !== 'succeeded'}
        className="rounded-full p-2 w-10 h-10cursor-pointer"
      >
        <RefreshCw />
      </TooltipTrigger>
      <TooltipContent>
        <span>Refresh comic list</span>
      </TooltipContent>
    </Tooltip>
  );
};
