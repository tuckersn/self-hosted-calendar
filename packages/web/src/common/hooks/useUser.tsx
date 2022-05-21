import { useContext, useEffect, useState } from "react";

import { JWT, jwtDecode, UserType } from "@internal/schema/dist";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import { setUser as setUserReducer } from "../store/userSlice";



/**
 * React hook for the user's basic info,
 * this will just get the currently logged
 * in user's info.
 */
 export function useUser(): [JWT | null, typeof setUser] {
	
	const user: JWT | null = useSelector<any>(state => state.user.value) as any;
	const dispatch = useDispatch();

	function setUser(user: JWT | null) {
		dispatch(setUserReducer(user) as any);
	}

	return [user, setUser];
}


