import { Header } from "../../../../components/layouts/Header";
import { adminPageCrumbs } from "../../AdminPage";

export function DatabaseAdminPage() {
	return <div>
		<Header crumbs={adminPageCrumbs}>
			Database Panel
		</Header>
		<h1>Database Admin Page</h1>
		<p>
			This is the database admin page.
		</p>
	</div>;
}