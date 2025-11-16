'use client';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {Brackets, Frown} from 'lucide-react';

export const EmptyList = () => {
  return (
    <div className="w-full flex items-center justify-center h-100">
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Brackets />
          </EmptyMedia>
          <EmptyTitle>No comic</EmptyTitle>
          <EmptyDescription>No comic found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2 items-center">
            Nothing to see here <Frown />
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};
