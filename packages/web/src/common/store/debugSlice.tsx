import { JWT, jwtDecode } from "@internal/schema/dist";
import { createSlice } from "@reduxjs/toolkit";

export type DebugState = {
	debugMode: boolean;
}

let debugMode: boolean = false;
const debugModeStr = localStorage.getItem("debugMode");
if(debugModeStr === "true") {
	debugMode = true;
}
//@ts-expect-error
window.debugMode = debugMode;

export const debugSlice = createSlice({
	name: "debug",
	initialState: {
		debugMode
	},
	reducers: {
		setDebugMode: (state: DebugState, action: {payload:boolean}) => {
			localStorage.setItem("debugMode", action.payload ? "true" : "false");
			state.debugMode = action.payload;
			//@ts-expect-error
			window.user = action.payload;
		},
	},
});


export const { setDebugMode } = debugSlice.actions;
export const debugReducer = debugSlice.reducer;