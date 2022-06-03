import { Header } from "../../../components/layouts/Header";
import { adminPageCrumbs } from "../AdminPage";

export function CalendarAdminPage() {

	return <div>
		
		<Header crumbs={adminPageCrumbs}>
			Calendar Panel
		</Header>
		<h1>Calendar Admin Page</h1>
		<p>
			This is where you can reset users passwords and force create API keys and such.
		</p>
	</div>;
}