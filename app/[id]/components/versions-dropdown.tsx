import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {ChapterTranslatorVersion} from '@/lib/shared/models/chapter';
import {ReactNode} from 'react';

export const VersionsDropdown = ({
  children,
  versions,
  action,
}: {
  children: ReactNode;
  versions: ChapterTranslatorVersion[];
  action: (version: ChapterTranslatorVersion) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Chapter&apos;s versions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {versions.map((v) => (
            <DropdownMenuItem key={v.hid} className="cursor-pointer" onClick={() => action(v)}>
              {v.translator}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
