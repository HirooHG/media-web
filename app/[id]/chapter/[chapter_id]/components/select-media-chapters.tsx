import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import {useChaptersQuery} from '@/lib/redux/api';
import {useRouter} from 'next/navigation';

export const SelectMediaChapters = ({
  media_id,
  chapter_id,
}: {
  media_id: number;
  chapter_id: number;
}) => {
  const {push} = useRouter();
  const {data: chapters, isLoading, isError} = useChaptersQuery(media_id);

  if (isLoading || isError || !chapters) return null;

  const chap = chapters.find((c) => c.id === chapter_id);

  return (
    <Select
      onValueChange={(v) => push('/' + media_id + '/chapter/' + v)}
      value={chapter_id.toString()}
    >
      <SelectTrigger className="w-full bg-white">
        {!chap ? (
          <span>Chapter not found</span>
        ) : (
          <span>
            {chap.chap} {chap.translator ? ' - ' + chap.translator : ''}
          </span>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Current media chapters</SelectLabel>
          {chapters.map((c) => {
            return (
              <SelectItem key={c.id} value={c.id.toString()} className="cursor-pointer">
                {c.chap} {c.translator ? ' - ' + c.translator?.toLowerCase() : ''}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
