import { useContext, useEffect, useState } from "react";

import { JWT, jwtDecode, UserType } from "@internal/schema/dist";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../common/store/store";
import { setUser as setUserReducer } from "../../common/store/userSlice";



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


function isUserAdmin(user: JWT | null): boolean {
	if(user === null)
		return false;
	return user.userType === UserType.ADMIN || user.userType === UserType.ADMIN_SERVICE || user.userType === UserType.READ_ONLY_ADMIN_SERVICE;
}


/**
 * ***WARNING: THIS PROVIDES NO SECURITY!***
 * 
 * In frontend development everything is exposed
 * to the user's client, so do not use this to
 * verify if a user is an admin.
 * 
 * This is meant to just hide some links or
 * redirect from the admin pages. This means
 * all admin pages are accessible, but the
 * user's API requests will be 403 so
 * no data is exposed. This repo is open
 * source anyway.
 */
 export function useIsAdmin(): boolean {
	
	const [user] = useUser();
	const [isAdmin, setIsAdmin] = useState(isUserAdmin(user));

	//@ts-expect-error
	window.isAdmin = isAdmin;

	useEffect(() => {
		setIsAdmin(isUserAdmin(user));
	}, [user]);

	return isAdmin;
}