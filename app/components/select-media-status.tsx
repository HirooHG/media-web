'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {setSelectedStatus} from '@/lib/redux/slices/media-list-slice';
import {MediaStatus, MediaStatusKeys} from '@/lib/shared/models/media-status';

const STATUSES = Object.keys(MediaStatus).filter((k) => isNaN(Number(k)));

export const SelectMediaStatus = () => {
  const dispatch = useAppDispatch();
  const {selectedStatus} = useAppSelector((state) => state.mediaList);

  return (
    <Select
      onValueChange={(v) => dispatch(setSelectedStatus(v as MediaStatusKeys))}
      value={selectedStatus || ''}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder={<span>Select a status</span>} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Statuses</SelectLabel>
          {STATUSES.map((k) => {
            return (
              <SelectItem key={k} value={k}>
                {k.toLowerCase()}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
