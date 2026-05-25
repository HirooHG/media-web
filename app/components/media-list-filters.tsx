import {Button} from '@/components/ui/button';
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from '@/components/ui/collapsible';
import {Filter} from 'lucide-react';
import {SelectMediaStatus} from './select-media-status';
import {SelectPerPage} from './select-per-page';
import {useState} from 'react';

export const MediaListFilters = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <Collapsible
      open={isFiltersOpen}
      onOpenChange={(v) => setIsFiltersOpen(v)}
      className="w-full flex flex-col px-10"
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <Filter />
          <span className="sr-only">Toggle details</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex gap-4 items-center py-2">
          <SelectPerPage />
          <SelectMediaStatus />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
