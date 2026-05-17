'use client';

import {AlertCircleIcon} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '../ui/alert';
import {useRouter} from 'next/navigation';
import {Button} from '../ui/button';

export const ErrorComponent = ({
  error,
  hasGoHomeAction = true,
}: {
  error: string | null;
  hasGoHomeAction?: boolean;
}) => {
  const {push} = useRouter();

  return (
    <div className="space-y-2">
      <Alert variant="destructive" className="w-fit">
        <AlertCircleIcon />
        <AlertTitle>Error !</AlertTitle>
        <AlertDescription>{error ?? 'There was an error but it is unknown'}</AlertDescription>
      </Alert>

      {hasGoHomeAction && (
        <Button className="w-full" onClick={() => push('/')}>
          Go Home
        </Button>
      )}
    </div>
  );
};
