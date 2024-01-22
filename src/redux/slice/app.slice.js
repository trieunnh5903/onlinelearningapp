import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tabBarVisible: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeTabBarVisible: (state, action) => {
      state.tabBarVisible = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {changeTabBarVisible} = appSlice.actions;

export default appSlice.reducer;
