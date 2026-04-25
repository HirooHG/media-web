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
import {useAppSelector} from '@/lib/redux/hooks';
import {setPerPage} from '@/lib/redux/slices/media-list-slice';
import {useDispatch} from 'react-redux';

const PER_PAGE_OPTIONS = ['5', '10', '15', '20', '25', '30'];

export const SelectPerPage = () => {
  const dispatch = useDispatch();
  const perPage = useAppSelector((state) => state.mediaList.per_page);

  return (
    <Select onValueChange={(v) => dispatch(setPerPage(parseInt(v, 10)))} value={perPage.toString()}>
      <SelectTrigger>
        <SelectValue placeholder={<span>Select a per page value</span>} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Medias per page</SelectLabel>
          {PER_PAGE_OPTIONS.map((k) => {
            return (
              <SelectItem key={k} value={k} className="cursor-pointer">
                {k}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
