'use client';

import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {refreshMedias} from '@/lib/redux/slices/media-list.slice';
import {RefreshCw} from 'lucide-react';

export const RefreshList = () => {
  const dispatch = useAppDispatch();
  const {page, per_page} = useAppSelector((state) => state.mediaList);

  return (
    <div className="rounded-full p-2 w-10 h-10 hover:bg-neutral-100">
      <Tooltip>
        <TooltipTrigger className="w-full h-full">
          <RefreshCw
            onClick={() => dispatch(refreshMedias({page, per_page}))}
            className="w-full h-full cursor-pointer"
          />
        </TooltipTrigger>
        <TooltipContent>
          <span>Refresh comic list</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
