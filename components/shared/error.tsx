'use client';

import {AlertCircleIcon} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '../ui/alert';
import {Button} from '../ui/button';

export const ErrorComponent = ({error, callback}: {error: string | null; callback: () => void}) => {
  return (
    <Alert variant="destructive" className="w-fit">
      <AlertCircleIcon />
      <AlertTitle>Error !</AlertTitle>
      <AlertDescription>
        {error ?? 'There was an error but it is unknown'}
        <Button variant="destructive" onClick={callback}>
          Dismiss
        </Button>
      </AlertDescription>
    </Alert>
  );
};
