import styled from "styled-components";

const CalendarContainer = (styled.div`
	display: flex;
	height: 100%;
	width: 100%;
`);

const Overview = (styled.div`
	flex: 1;
`);

const WeeklyCalendar = (styled.div`
	flex: 1;
`);

const MonthlyCalendar = (styled.div`
	flex: 1;
`);

export function CalendarPage() {

	return <CalendarContainer>
		<Overview>
			<h1>Overview</h1>
			Daily information would go here.

			Reminders would go here.
		</Overview>
		<div style={{
			display: "flex",
			flexDirection: "column",
			flex: 1
		}}>
			<WeeklyCalendar>
				Weekly
			</WeeklyCalendar>
			<MonthlyCalendar>
				Monthly
			</MonthlyCalendar>
		</div>
	</CalendarContainer>;
}