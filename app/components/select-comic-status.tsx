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
import {useEffect} from 'react';

export const SelectComicStatus = () => {
  const dispatch = useAppDispatch();
  const status: string | undefined = undefined;

  const statuses = Object.keys(ComicStatus).filter((k) => isNaN(Number(k)));

  const valueChange = (value: string | null) => {
    let index: number | null = null;
    if (value !== null) {
      index = statuses.indexOf(value) + 1;
    }
    dispatch(setSelectedStatus(index));
  };

  useEffect(() => {
    if (status === undefined) {
      valueChange(null);
    }
  }, [status]);

  return (
    <Select
      onValueChange={(v) => {
        valueChange(v);
      }}
      value={status}
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
