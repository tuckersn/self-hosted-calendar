import { useDebugMode } from "../../../../common/hooks";
import { Button } from "../../../../components/inputs/Button";
import { Header } from "../../../../components/layouts/Header";
import { adminPageCrumbs } from "../../AdminPage";

export function AdminDashboardPage() {

	
	const [debugMode, setDebugMode] = useDebugMode();

	return <div>
		<Header crumbs={adminPageCrumbs}>
			Overview Dashboard
		</Header>
		<h1>Charts and stats here </h1>
	</div>;
}