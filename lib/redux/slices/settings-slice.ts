import {AppTheme} from '@/types/app-theme';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const THEME_KEY = 'darkMode';

export interface SettingsState {
  theme: AppTheme;
  sidebarOpen: boolean;
}

const initialState: SettingsState = {
  theme: 'light',
  sidebarOpen: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<AppTheme>) => {
      const {payload: theme} = action;
      localStorage.setItem(THEME_KEY, theme);
      state.theme = theme;
    },
    setSidebarToggle: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const {setTheme, setSidebarToggle} = settingsSlice.actions;
export default settingsSlice.reducer;
