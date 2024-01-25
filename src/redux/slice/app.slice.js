import {createSlice} from '@reduxjs/toolkit';
import {darkTheme, lightTheme} from '../../constants';

const initialState = {
  tabBarVisible: true,
  appTheme: lightTheme,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeTabBarVisible: (state, action) => {
      state.tabBarVisible = action.payload;
    },

    changeTheme: (state, action) => {
      const themeKey = action.payload;
      if (themeKey === lightTheme.name) {
        state.appTheme = lightTheme;
      } else {
        state.appTheme = darkTheme;
      }
    },
  },
});

export const {changeTabBarVisible, changeTheme} = appSlice.actions;

export default appSlice.reducer;
