import {appToast} from '@/components/shared/app-toast';
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import {
  useGetMediaReadingStatusQuery,
  useGetReadingStatusesQuery,
  usePatchMediaReadingStatusMutation,
} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hooks';
import {Media} from '@/lib/shared/models/media';
import {ReadingStatus} from '@/lib/shared/models/reading-status';

export const MediaReadingStatus = ({media}: {media: Media}) => {
  const readingStatuses = useAppSelector((state) => state.core.readingStatuses);
  const readingStatus = useAppSelector((state) => state.media.readingStatus);
  const [modifyMedia] = usePatchMediaReadingStatusMutation();

  const {refetch} = useGetMediaReadingStatusQuery(media.id, {refetchOnMountOrArgChange: true});
  useGetReadingStatusesQuery();

  const onChange = async (status: ReadingStatus | null) => {
    const {data, error} = await modifyMedia({
      mediaId: media.id,
      readingStatusId: status?.id ?? null,
    });

    if (!data || error) {
      appToast('Media', 'Could not modify media reading status');
      return;
    }

    appToast('Media', 'Reading status modified');
    refetch();
  };

  return (
    <Combobox value={readingStatus} items={readingStatuses} onValueChange={onChange}>
      <ComboboxInput placeholder="Select a reading status" showClear />
      <ComboboxContent>
        <ComboboxList>
          {(r) => (
            <ComboboxItem key={r.id} value={r}>
              {r.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
