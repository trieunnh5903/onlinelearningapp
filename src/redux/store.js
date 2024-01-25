import {configureStore} from '@reduxjs/toolkit';
import appSlice from './slice/app.slice';
import {useSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});
