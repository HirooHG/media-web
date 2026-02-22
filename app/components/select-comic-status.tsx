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
import {useAppDispatch, useAppSelector} from '@/lib/redux/comics/hooks';
import {setSelectedStatus} from '@/lib/redux/comics/slices/media-list.slice';
import {ComicStatus, ComicStatusKeys} from '@/lib/shared/models/comic-status';

const STATUSES = Object.keys(ComicStatus).filter((k) => isNaN(Number(k)));

export const SelectComicStatus = () => {
  const dispatch = useAppDispatch();
  const {selectedStatus} = useAppSelector((state) => state.mediaList);

  return (
    <Select
      onValueChange={(v) => dispatch(setSelectedStatus(v as ComicStatusKeys))}
      value={selectedStatus ?? undefined}
    >
      <SelectTrigger className="w-[180px]">
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
