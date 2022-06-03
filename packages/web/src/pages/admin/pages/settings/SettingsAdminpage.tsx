import { Header } from "../../../../components/layouts/Header";
import { adminPageCrumbs } from "../../AdminPage";

export function SettingsAdminPage() {

	return <div>
		
		<Header crumbs={adminPageCrumbs}>
			Settings Panel
		</Header>
		<h1>Settings Admin Page</h1>
		<p>
			This is where you can reset users passwords and force create API keys and such.
		</p>
	</div>;
}