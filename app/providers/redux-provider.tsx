'use client';

import {store} from '@/lib/redux/store';
import {ReactNode, useMemo} from 'react';
import {Provider} from 'react-redux';

export function ReduxProvider({children}: {children: ReactNode}) {
  const appStore = useMemo(() => store(), []);

  return <Provider store={appStore}>{children}</Provider>;
}
