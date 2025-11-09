'use client';

import {Spinner} from '@/components/ui/spinner';

export const Pending = () => {
  return (
    <div className="w-full h-100 flex items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
};
