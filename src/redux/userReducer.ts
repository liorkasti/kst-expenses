import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
}

const initialState: UserState = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    removeUser: state => {
      state.username = '';
    },
  },
});

export const {storeUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
