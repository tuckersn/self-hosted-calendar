import { slateNodeFromStr } from "@internal/schema/dist/serialization";
import { addHours } from "date-fns";
import React from "react";
import { MdAdd, MdArrowBack } from "react-icons/md";
import styled from "styled-components";
import { COLORS, STYLE_VALUES } from "../../common/style";
import { DailyCalendar } from "../../components/calendars/DailyCalendar";
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
	border-radius: ${STYLE_VALUES.borderRadiusHeavy}px;
	background-color: ${COLORS.backgroundExtremelyDark}px;
`);

const CalendarContainer = (styled.div`
	border-top: 1px solid ${COLORS.border};
	border-left: 1px solid ${COLORS.border};
`);

const Toolbar = (styled.div`
	display: flex;
	flex-direction: row;
	padding-top: 8px;
	padding-bottom: 8px;
`);

export function CalendarPage() {

	const [sideBarPercentage, setSideBarPercentage] = React.useState(20);

	return <CalendarPageContainer>
		<Sidebar style={{
			flex: sideBarPercentage / 100,
			padding: "8px",
			display: "flex",
			flexDirection: "column"
		}}>
			<Header>
				<p>Calendar</p>
			</Header>

			<SidebarSection>
				<SidebarSectionHeading>
					Heading
				</SidebarSectionHeading>
				<SidebarSectionContent>
					Content
				</SidebarSectionContent>
			</SidebarSection>
			<SidebarSection>
				<SidebarSectionHeading>
					Heading
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
					<Button small>
						<MdAdd size={18}/>
					</Button>
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
					textAlign: "right",
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
					alignContent: "flex-end"
				}}>
					<Button small>
						<MdArrowBack size={18}/>
					</Button>
					<Button small>
						<MdArrowBack size={18}/>
					</Button>
				</div>
			</Toolbar>
			<CalendarContainer>
				<DailyCalendar height={3000} events={{
					"ABC": {
						id: "ABC",
						start: new Date(Date.now()),
						end: addHours(new Date(Date.now()), 1),
						title: "Hello World Title 1",
						description: slateNodeFromStr("This would be a description of the event.")
					}
				}}/>
			</CalendarContainer>
		</div>
	</CalendarPageContainer>;
}