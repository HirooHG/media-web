'use client';

import {Pending} from '@/app/components/pending';
import {EmptyList} from '@/components/shared/empty-list';
import {ErrorComponent} from '@/components/shared/error';
import {Button} from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle} from '@/components/ui/item';
import {useChaptersQuery} from '@/lib/redux/api';
import {useAppSelector} from '@/lib/redux/hooks';
import {ArrowRight} from 'lucide-react';
import {useRouter} from 'next/navigation';

export const Chapters = ({media_id}: {media_id: number}) => {
  const router = useRouter();
  const {
    chapters,
    chaptersStatus: status,
    chaptersError: error,
  } = useAppSelector((state) => state.media);

  useChaptersQuery(media_id, {refetchOnMountOrArgChange: true});

  if (status === 'pending') {
    return <Pending />;
  }

  if (status === 'error' || error) {
    return (
      <div className="h-6/12 w-full flex items-center justify-center">
        <ErrorComponent error={error as string} />
      </div>
    );
  }

  return (
    <>
      {!chapters || chapters.length === 0 ? (
        <div className="flex items-center justify-center">
          <div className="w-6/12">
            <EmptyList
              title="No chapters found"
              description="Refresh the chapters to get the latest chapters"
            />
          </div>
        </div>
      ) : (
        <ul className="space-y-4 w-full flex-1 overflow-auto">
          {chapters.map((ch) => (
            <li id={ch.id.toString()} key={ch.id}>
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle>{ch.chap}</ItemTitle>
                  <ItemDescription>
                    {ch.versions.map((c) => c.translator).join(' - ')}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="hover:bg-tertiary dark:hover:bg-tertiary">
                        <ArrowRight />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Chapter&apos;s versions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {ch.versions.map((v) => (
                          <DropdownMenuItem
                            key={v.hid}
                            className="cursor-pointer"
                            onClick={() => {
                              router.push('/' + media_id + '/chapter/' + v.hid);
                            }}
                          >
                            {v.translator}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ItemActions>
              </Item>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
