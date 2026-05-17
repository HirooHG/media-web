'use client';

import {useAppSelector} from '@/lib/redux/hooks';
import {setTheme} from '@/lib/redux/slices/settings-slice';
import {AppTheme} from '@/types/app-theme';
import {ReactNode, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';

export const DarkModeProvider = ({children}: {children: ReactNode}) => {
  const init = useRef(false);
  const dispatch = useDispatch();
  const theme = useAppSelector((state) => state.settings.theme);

  useEffect(() => {
    if (init.current) return;
    init.current = true;
    const mode = localStorage.getItem('darkMode');
    if (!mode) {
      localStorage.setItem('darkMode', 'light');
      return;
    }
    dispatch(setTheme(mode as AppTheme));
  }, [dispatch]);

  return (
    <html lang="en" data-theme={theme}>
      {children}
    </html>
  );
};
