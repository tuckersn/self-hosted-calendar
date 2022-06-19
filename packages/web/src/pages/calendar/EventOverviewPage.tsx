import styled from "styled-components";
import { Header } from "../../components/layouts/Header";


const EventOverviewPageContainer = styled.div`

`;


export function EventOverviewPage() {
	return <EventOverviewPageContainer>
		<Header crumbs={[]}>
			<p>Event</p>
		</Header>
	</EventOverviewPageContainer>;
}