import { JWT, jwtDecode } from "@internal/schema/dist";
import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
	value: JWT | null;	
}

const jwt = localStorage.getItem("jwt");
let token: JWT | null = null;
if(jwt !== null) {
	token = jwtDecode(jwt);
}
//@ts-expect-error
window.user = token;

export const userSlice = createSlice({
	name: "user",
	initialState: {
		value:  token
	},
	reducers: {
		setUser: (state: UserState, action: {payload:JWT|null}) => {
			state.value = action.payload;

			//@ts-expect-error
			window.user = action.payload;
		},
	},
});


export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;