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
import {useAppDispatch} from '@/lib/redux/hooks';
import {setSelectedStatus} from '@/lib/redux/slices/media-list.slice';
import {ComicStatus} from '@/lib/shared/models/comic-status';

export const SelectComicStatus = () => {
  const dispatch = useAppDispatch();

  const statuses = Object.keys(ComicStatus).filter((k) => isNaN(Number(k)));

  const valueChange = (value: string) => {
    const index = statuses.indexOf(value) + 1;
    dispatch(setSelectedStatus(index));
  };

  return (
    <Select
      onValueChange={(v) => {
        valueChange(v);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Statuses</SelectLabel>
          {statuses.map((k) => {
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
