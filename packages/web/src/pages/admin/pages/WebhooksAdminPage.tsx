import { Header } from "../../../components/layouts/Header";
import { adminPageCrumbs } from "../AdminPage";

export function WebhookAdminPage() {

	return <div>
		
		<Header crumbs={adminPageCrumbs}>
			Webhook Panel
		</Header>
		<h1>Webhook Admin Page</h1>
		<p>
			This is where you can reset users passwords and force create API keys and such.
		</p>
	</div>;
}