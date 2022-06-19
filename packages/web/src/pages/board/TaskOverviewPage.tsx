import styled from "styled-components";
import { Header } from "../../components/layouts/Header";


const TaskOverviewPageContainer = styled.div`

`;


export function TaskOverviewPage() {
	return <TaskOverviewPageContainer>
		<Header crumbs={[]}>
			<p>Event</p>
		</Header>
	</TaskOverviewPageContainer>;
}