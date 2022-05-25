import { createSlice } from "@reduxjs/toolkit";

export type HeadState = {
	title: string;
}

export const headSlice = createSlice({
	name: "head",
	initialState: {
		title: ""
	},
	reducers: {
		setTitle: (state: HeadState, action: {payload:string}) => {
			state.title = action.payload;
		},
	},
});


export const { setTitle } = headSlice.actions;
export const headReducer = headSlice.reducer;