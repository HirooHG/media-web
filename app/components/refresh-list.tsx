'use client';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useMediaImageMutation, useRefreshMutation} from '@/lib/redux/api';
import {useAppDispatch, useAppSelector} from '@/lib/redux/hooks';
import {
  clearImageState,
  initMultipleImageLoading,
  nextImage,
} from '@/lib/redux/slices/media-image-slice';
import {setImage} from '@/lib/redux/slices/media-list-slice';
import {setMediaError} from '@/lib/redux/slices/media-slice';
import {MediaStatus} from '@/lib/shared/models/media-status';
import {RefreshCw} from 'lucide-react';
import {useEffect} from 'react';

export const RefreshList = () => {
  const {page, per_page, status, selectedStatus} = useAppSelector((state) => state.mediaList);
  const [refresh] = useRefreshMutation();

  const dispatch = useAppDispatch();
  const medias = useAppSelector((state) => state.mediaList.medias);
  const {currentImage, imagesStatus} = useAppSelector((state) => state.mediaImage);

  const [getMediaImage] = useMediaImageMutation();

  useEffect(() => {
    if (imagesStatus === 'idle') return;

    if (!currentImage) return;
    getMediaImage(currentImage)
      .then((value) => {
        if (value.data) {
          dispatch(setImage(value.data));
          dispatch(nextImage());
        }
      })
      .catch(() => {
        dispatch(setMediaError('Failed to load image of media' + currentImage));
        dispatch(clearImageState());
      });
  }, [currentImage, imagesStatus, dispatch, getMediaImage]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-secondary rounded-full p-2 w-10 h-10 cursor-pointer"
          variant="outline"
          disabled={status !== 'succeeded'}
        >
          <RefreshCw />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Refresh things</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              refresh({
                page,
                per_page,
                status: selectedStatus === null ? null : MediaStatus[selectedStatus],
              });
            }}
          >
            Refresh medias
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              const toLoadMedias = medias.filter((m) => !m.image).map((m) => m.id);
              dispatch(initMultipleImageLoading(toLoadMedias));
            }}
          >
            Load page medias image
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
