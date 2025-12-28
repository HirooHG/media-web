'use client';

import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {refreshMedias} from '@/lib/redux/slices/media-list.slice';
import {RefreshCw} from 'lucide-react';

export const RefreshList = () => {
  const dispatch = useAppDispatch();
  const {page, per_page, status} = useAppSelector((state) => state.mediaList);

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={() => dispatch(refreshMedias({page, per_page}))}
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
