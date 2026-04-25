import {AppTheme} from '@/types/app-theme';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const THEME_KEY = 'darkMode';

export interface SettingsState {
  theme: AppTheme;
}

const initialState: SettingsState = {
  theme: 'light',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<AppTheme>) => {
      const {payload: theme} = action;
      localStorage.setItem(THEME_KEY, theme);
      state.theme = theme;
    },
  },
});

export const {setTheme} = settingsSlice.actions;
