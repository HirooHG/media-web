import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import {useChaptersQuery} from '@/lib/redux/api';
import {Chapter, ChapterTranslatorVersion} from '@/lib/shared/models/chapter';
import {useRouter} from 'next/navigation';

export const SelectMediaChapters = ({
  mediaId,
  version,
  chap,
}: {
  mediaId: number;
  version: ChapterTranslatorVersion;
  chap: Chapter;
}) => {
  const {push} = useRouter();
  const {data: chapters, isLoading, isError} = useChaptersQuery(mediaId);

  if (isLoading || isError || !chapters) return null;

  return (
    <Select onValueChange={(v) => push('/' + mediaId + '/chapter/' + v)} value={version.hid}>
      <SelectTrigger className="w-full bg-white">
        {!chap ? (
          <span>Chapter not found</span>
        ) : (
          <span>
            {chap.chap} {version.translator ? ' - ' + version.translator : ''}
          </span>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Current media chapters</SelectLabel>
          {chapters.map((c) => {
            const v =
              c.versions.find((vs) => vs.translator === version.translator) ?? c.versions[0];
            return (
              <SelectItem key={v.hid} value={v.hid} className="cursor-pointer">
                {c.chap} {v.translator ? ' - ' + v.translator?.toLowerCase() : ''}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
