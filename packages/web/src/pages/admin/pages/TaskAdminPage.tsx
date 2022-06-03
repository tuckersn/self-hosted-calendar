import { Header } from "../../../components/layouts/Header";
import { adminPageCrumbs } from "../AdminPage";

export function TaskAdminPage() {

	return <div>
		
		<Header crumbs={adminPageCrumbs}>
			Task Panel
		</Header>
		<h1>Task Admin Page</h1>
		<p>
			This is where you can reset users passwords and force create API keys and such.
		</p>
	</div>;
}