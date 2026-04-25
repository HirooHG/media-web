'use client';

import {useAppSelector} from '@/lib/redux/hooks';
import {setTheme} from '@/lib/redux/slices/settings-slice';
import {AppTheme} from '@/types/app-theme';
import {ReactNode, useEffect} from 'react';
import {useDispatch} from 'react-redux';

export const DarkModeProvider = ({children}: {children: ReactNode}) => {
  const dispatch = useDispatch();
  const theme = useAppSelector((state) => state.settings.theme);

  useEffect(() => {
    const mode = localStorage.getItem('darkMode');
    if (!mode) {
      localStorage.setItem('darkMode', 'light');
      return;
    }
    dispatch(setTheme(mode as AppTheme));
  }, [dispatch]);

  console.log(theme);

  return (
    <html lang="en" data-theme={theme}>
      {children}
    </html>
  );
};
