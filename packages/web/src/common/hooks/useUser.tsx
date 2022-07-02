import { useContext, useEffect, useMemo, useState } from "react";

import { JWT, jwtDecode, UserType } from "@internal/schema/dist";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import { setUser as setUserReducer } from "../store/userSlice";
import { Navigate, Outlet } from "react-router-dom";



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


export function UserRoute() {
	const [user] = useUser();
	
	if(user === null) {
		alert("You must be logged in to view this page.");
		return <Navigate to={"/"}/>;
	}

	return <Outlet/>;
}