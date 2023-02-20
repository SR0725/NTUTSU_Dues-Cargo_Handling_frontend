import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
	type: string;
	jwt: string;
	name: string;
	email: string;
}

// Define the initial state using that type
const initialState: AccountState = {
	type: 'logout',
	jwt: '',
	name: '',
	email: '',
};

export const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		login: (
			state,
			action: PayloadAction<{ jwt: string; name: string; email: string }>
		) => {
			state.jwt = action.payload.jwt;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.type = 'login';
		},
		logout: (state) => {
			state.jwt = '';
			state.name = '';
			state.email = '';
			state.type = 'logout';
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout } = accountSlice.actions;

export default accountSlice.reducer;
