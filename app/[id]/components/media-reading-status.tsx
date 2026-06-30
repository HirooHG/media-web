import {appToast} from '@/components/shared/app-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {usePatchMediaReadingStatusMutation} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hooks';
import {Media} from '@/lib/shared/models/media';
import {useState} from 'react';

export const MediaReadingStatus = ({media}: {media: Media}) => {
  const readingStatuses = useAppSelector((state) => state.core.readingStatuses);
  const [mediaReadingStatus, setMediaReadingStatus] = useState(() =>
    readingStatuses.find((r) => r.id === media.readingStatus),
  );
  const [modifyMedia] = usePatchMediaReadingStatusMutation();

  const onChange = async (id: string) => {
    const {data, error} = await modifyMedia({mediaId: media.id, readingStatusId: id});

    if (!data || error) {
      appToast('Media', 'Could not modify media reading status');
      return;
    }

    appToast('Media', 'Reading status modified');
    setMediaReadingStatus(readingStatuses.find((r) => data.readingStatus === r.id));
  };

  return (
    <Select value={mediaReadingStatus?.id} onValueChange={onChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Reading statuses</SelectLabel>
          {readingStatuses.map((r) => (
            <SelectItem key={r.id} value={r.id}>
              {r.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
