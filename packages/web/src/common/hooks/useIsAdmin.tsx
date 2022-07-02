import { JWT, UserType } from "@internal/schema/dist";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./useUser";


export function isUserAdmin(user: JWT | null): boolean {
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


export function AdminRoute() {
	const admin = useIsAdmin();
	
	if(admin) {
		alert("Only admins can view this page.");
		return <Outlet/>;
	}
	
	return <Navigate to={"/"}/>;
}