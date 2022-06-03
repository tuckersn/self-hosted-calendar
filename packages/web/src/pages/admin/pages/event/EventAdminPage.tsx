import { Header } from "../../../../components/layouts/Header";
import { adminPageCrumbs } from "../../AdminPage";

export function EventAdminPage() {
	return <div>
		<Header crumbs={adminPageCrumbs}>
			Event Panel
		</Header>
		<h1>Event Admin Page</h1>
		<p>
			This is the database admin page.
		</p>
	</div>;
}