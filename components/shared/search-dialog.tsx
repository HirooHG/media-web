'use client';

import {DialogContent, Dialog, DialogTitle, DialogDescription} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {useSearchMutation} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hooks';
import {clearSearchMedias, setSearchDialogOpen} from '@/lib/redux/slices/ui-slice';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/navigation';
import {MediaImagePlaceholder} from '@/app/components/media-image-placeholder';
import {MediaImage} from '@/app/components/media-image';

export const SearchDialog = () => {
  const {push} = useRouter();
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const open = useAppSelector((state) => state.ui.searchDialogOpen);
  const searchMedias = useAppSelector((state) => state.ui.searchMedias);
  const [search] = useSearchMutation();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        dispatch(setSearchDialogOpen(!open));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        dispatch(setSearchDialogOpen(v));
        dispatch(clearSearchMedias());
      }}
    >
      <DialogTitle />
      <DialogDescription />
      <DialogContent
        aria-description="Search medias"
        showCloseButton={false}
        className="w-150 flex flex-col p-0 gap-0 overflow-hidden rounded-sm"
      >
        <Input
          className="rounded-sm border-0 focus-visible:ring-0 bg-background!"
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          onKeyUp={(e) => {
            if (filter === '') {
              dispatch(clearSearchMedias());
              return;
            }
            if (e.key === 'Enter') search(filter);
          }}
        />
        <div className="flex-1">
          {searchMedias.map((m) => (
            <div
              key={m.id}
              tabIndex={0}
              className="border-t focus-visible:outline-none dark:focus:bg-zinc-900 focus:bg-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-900 cursor-pointer px-4 h-20 flex gap-4 items-center"
              role="button"
              onClick={() => {
                dispatch(setSearchDialogOpen(false));
                dispatch(clearSearchMedias());
                push('/' + m.id);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  dispatch(setSearchDialogOpen(false));
                  dispatch(clearSearchMedias());
                  push('/' + m.id);
                }
              }}
            >
              {m.image ? (
                <MediaImage size="small" uri={m.image?.uri} slug={m.slug} />
              ) : (
                <MediaImagePlaceholder size="small" loadingEnabled={false} />
              )}
              <div className="flex-1 h-full">
                <span className="text-sm text-ellipsis">{m.title}</span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
