import { Header } from "../../../../components/layouts/Header";
import { adminPageCrumbs } from "../../AdminPage";

export function TaskBoardAdminPage() {

	return <div>
		
		<Header crumbs={adminPageCrumbs}>
			Task Board Panel
		</Header>
		<h1>Task Board Admin Page</h1>
		<p>
			This is where you can reset users passwords and force create API keys and such.
		</p>
	</div>;
}