import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState} from '../types';

interface StoreUserPayload {
  userName: string;
  id: string;
}

const initialState: UserState = {
  username: '',
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<StoreUserPayload>) => {
      state.username = action.payload.userName;
      state.id = action.payload.id;
    },
    removeUser: state => {
      state.username = '';
      state.id = '';
    },
  },
});

export const {storeUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
