import { useDebugMode } from "../../../common/hooks";
import { Button } from "../../../components/inputs/Button";

export function AdminDashboardPage() {

	
	const [debugMode, setDebugMode] = useDebugMode();

	return <div>
		<h1>Charts and stats here </h1>
	</div>;
}