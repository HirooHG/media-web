'use client';

import {AlertCircleIcon} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '../ui/alert';

export const ErrorComponent = ({error}: {error: string | null}) => {
  return (
    <Alert variant="destructive" className="w-fit">
      <AlertCircleIcon />
      <AlertTitle>Error !</AlertTitle>
      <AlertDescription>{error ?? 'There was an error but it is unknown'}</AlertDescription>
    </Alert>
  );
};
