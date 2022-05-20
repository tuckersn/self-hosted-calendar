import { Outlet } from "react-router-dom";

import { SidebarLayout } from "../../components/layouts/SidebarLayout";


export function AdminPage() {
	return <SidebarLayout sidebarContent={
		<div>
			<h1>Sidebar</h1>
			Different sections would go here.
		</div>
	}>
		Admin Panel
		<Outlet></Outlet>
	</SidebarLayout>;
}