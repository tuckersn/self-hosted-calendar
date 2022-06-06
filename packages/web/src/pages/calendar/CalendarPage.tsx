import { slateNodeFromStr } from "@internal/schema/dist/serialization";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { addHours } from "date-fns";
import React from "react";
import { MdAdd, MdArrowBack } from "react-icons/md";
import styled from "styled-components";
import { COLORS, STYLE_VALUES } from "../../common/style";
import { DailyCalendar } from "../../components/calendars/DailyCalendar";
import { MonthlyCalendar } from "../../components/calendars/MonthlyCalendar";
import { WeeklyCalendar } from "../../components/calendars/WeeklyCalendar";
import { Button } from "../../components/inputs/Button";
import { Header } from "../../components/layouts/Header";

const CalendarPageContainer = (styled.div`
	display: flex;
	height: 100%;
	width: 100%;
`);

const Sidebar = (styled.div`
	background-color: ${COLORS.backgroundDark};
`);

const SidebarSection = (styled.div`
	margin: 8px;
	flex: 1;
	display: flex;
	flex-direction: column;
`);

const SidebarSectionHeading = (styled.div`

`);

const SidebarSectionContent = (styled.div`
	flex: 1;
	border: 2px solid ${COLORS.border};
	border-radius: ${STYLE_VALUES.borderRadiusLight}px;
	background-color: ${COLORS.backgroundExtremelyDark}px;
`);

const CalendarContainer = (styled.div`
	border-top: 1px solid ${COLORS.border};
	border-left: 1px solid ${COLORS.border};
	overflow-y: auto;
`);

const Toolbar = (styled.div`
	display: flex;
	flex-direction: row;
`);

export type CalendarType = "daily" | "weekly" | "monthly" | "yearly";

export function CalendarPage() {

	const [sideBarPercentage, setSideBarPercentage] = React.useState(20);
	const [calendarType, setCalendarType] = React.useState<CalendarType>('daily');

	return <CalendarPageContainer>
		<Sidebar style={{
			flex: sideBarPercentage / 100,
			padding: "8px",
			display: "flex",
			flexDirection: "column"
		}}>
			<Header crumbs={[]}>
				<p>Calendar</p>
			</Header>

			<SidebarSection>
				Date selection calendar here
			</SidebarSection>
			<SidebarSection>
				<SidebarSectionHeading>
					Calendars
				</SidebarSectionHeading>
				<SidebarSectionContent>
					Content
				</SidebarSectionContent>
			</SidebarSection>
		</Sidebar>
		<div style={{
			display: "flex",
			flexDirection: "column",
			flex: 1 - (sideBarPercentage / 100),
		}}>
			<Toolbar>
				<div style={{
					flex: 1
				}}>
					<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
						<InputLabel id="demo-select-small">Calendar Type</InputLabel>
						<Select
							labelId="demo-select-small"
							id="demo-select-small"
							value={calendarType}
							label="Calendar Type"
							onChange={(event: SelectChangeEvent) => {
								setCalendarType(event.target.value as CalendarType);
							}}>
							<MenuItem selected value={'daily'}>Daily</MenuItem>
							<MenuItem value={'weekly'}>Weekly</MenuItem>
							<MenuItem value={'monthly'}>Monthly</MenuItem>
							<MenuItem value={'yearly'}>Yearly</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div style={{
					flex: 1,
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center"
				}}>
					<Button small>
						<MdArrowBack size={18}/>
					</Button>
				</div>
				<div style={{
					flex: 1,
					textAlign: "center",
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
					alignContent: "flex-end"
				}}>
					<Button small>
						<MdAdd size={18}/>
					</Button>
				</div>
			</Toolbar>
			<CalendarContainer>
				{
					calendarType === 'daily' && <DailyCalendar height={3000} events={{
						"ABC": {
							id: "ABC",
							start: new Date(Date.now()),
							end: addHours(new Date(Date.now()), 1),
							title: "Hello World Title 1",
							description: slateNodeFromStr("This would be a description of the event.")
						}
					}}/>
				}
				{
					calendarType === 'weekly' && <WeeklyCalendar/>
				}
				{
					calendarType === 'monthly' && <MonthlyCalendar/>
				}
			</CalendarContainer>
		</div>
	</CalendarPageContainer>;
}