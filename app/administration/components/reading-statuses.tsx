'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {appToast} from '@/components/shared/app-toast';
import {
  useDeleteReadingStatusMutation,
  useGetReadingStatusesQuery,
  usePostReadingStatusMutation,
} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hooks';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useState} from 'react';
import {NotebookPen} from 'lucide-react';

export const ReadingStatusAdministration = () => {
  const [newStatus, setNewStatus] = useState('');
  const [toDeleteStatus, setToDeleteStatus] = useState<string | undefined>(undefined);
  const readingStatuses = useAppSelector((state) => state.core.readingStatuses);
  const {refetch} = useGetReadingStatusesQuery();

  const [deleteStatus] = useDeleteReadingStatusMutation();
  const [createStatus] = usePostReadingStatusMutation();

  const onDelete = async () => {
    if (!toDeleteStatus) return;

    const res = await deleteStatus(toDeleteStatus);

    if (res.error) {
      appToast('Reading Status', 'Could not delete reading status');
      return;
    }

    appToast('Reading Status', 'Successfully deleted reading status');
    await refetch();
    setToDeleteStatus(undefined);
  };

  const onAdd = async () => {
    if (!newStatus || newStatus === '') return;

    const res = await createStatus({label: newStatus});

    if (res.error) {
      appToast('Reading Status', 'Could not create the status');
      return;
    }

    appToast('Reading Status', 'Reading status successfully created');
    setNewStatus('');
    await refetch();
  };

  return (
    <div className="w-full min-h-40">
      <div className="h-full flex items-center gap-4">
        <div className="flex gap-2 items-center">
          <NotebookPen />
          <span className="w-70">Reading Status</span>
        </div>
        <div className="flex-1 h-full flex flex-col justify-center items-start gap-6">
          <div className="flex gap-4">
            <Input
              value={newStatus}
              maxLength={50}
              placeholder="Reading status label"
              onChange={({target}) => setNewStatus(target.value)}
            />
            <Button onClick={onAdd}>Add Status</Button>
          </div>
          <div className="flex gap-4">
            <Select value={toDeleteStatus || ''} onValueChange={setToDeleteStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {readingStatuses.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={onDelete}>
              Delete status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
