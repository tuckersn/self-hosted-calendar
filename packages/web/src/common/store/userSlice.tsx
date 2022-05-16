import { JWT } from "@internal/schema/dist";
import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
	value: JWT | null;	
}


export const userSlice = createSlice({
	name: "user",
	initialState: {
		value: null
	},
	reducers: {
		setUser: (state: UserState, action: {payload:JWT|null}) => {
			state.value = action.payload;
		},
	},
});


export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;