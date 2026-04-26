'use client';

import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {useRefreshMutation} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hooks';
import {MediaStatus} from '@/lib/shared/models/media-status';
import {RefreshCw} from 'lucide-react';

export const RefreshList = () => {
  const {page, per_page, status, selectedStatus} = useAppSelector((state) => state.mediaList);
  const [refresh] = useRefreshMutation();

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={() =>
          refresh({
            page,
            per_page,
            status: selectedStatus === null ? null : MediaStatus[selectedStatus],
          })
        }
        disabled={status !== 'succeeded'}
        className="bg-secondary rounded-full p-2 w-10 h-10 cursor-pointer"
      >
        <RefreshCw />
      </TooltipTrigger>
      <TooltipContent>
        <span>Refresh media list</span>
      </TooltipContent>
    </Tooltip>
  );
};
