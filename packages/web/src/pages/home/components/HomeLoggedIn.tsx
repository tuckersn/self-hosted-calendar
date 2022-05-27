import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS, CSS_PRESETS, STYLE_VALUES } from "../../../common/style";
import { Toggle } from "../../../components/inputs/Toggle";
import { ArticleLayout } from "../../../components/layouts/ArticleLayout";
import { useUser } from "../../../common/hooks/useUser";
import { DailyCalendar } from "../../../components/calendars/DailyCalendar";
import { TodoNote, TodoNoteProps } from "../../../components/todos/TodoNote";
import { ScrollContainer } from "../../../components/style/ScrollContainer";
import { useTitle } from "../../../common/hooks/useTitle";
import { useEffect } from "react";
import { NotificationBox, NotificationBoxProps } from "../../../components/NotificationBox";
import { addHours, setHours, setMinutes } from "date-fns";

const PADDING = "1vh";

const Container = (styled.div`
	height: 100%;
	display: flex;
	padding: ${PADDING};
`);


const NotificationBoxContainer = (styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;
	height: 100%;

	.NotificationContainer {
		border-bottom: 1px solid grey;
		:last-child {
			border: 0;
		}
	}
`);


const HalfOfContainer = (styled.div`
	flex: 50%;
	display: flex;
	flex-direction: column;
	height: 100%;
`);


const PANE_PADDING = 8;
const HalfPane = (styled.div`
	border: ${STYLE_VALUES.borderHeavy}px solid ${COLORS.border};
	/* border-radius: ${STYLE_VALUES.borderRadiusHeavy}px; */
	margin: ${PADDING};
	flex: 1;
	
	${CSS_PRESETS.boxShadowDark};
`);

const TodoBoxContainer = (styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-around;
	flex: 1;
	padding: 12px;
`);

const TodoItemContainer = (styled.div`
	margin: 12px;
`);

export function HomeLoggedIn() {

	
	const [_user] = useUser();
	// Assumes that the user is logged in
	const user = _user!;
	const [title, setTitle] = useTitle();

	
	
	const todoItems: TodoNoteProps[] = [{
		title: "hello world title",
		description: "hello world description of todo item here",
		color: "blue"
	},
	{
		title: "hello world title",
		description: "hello world description of todo item here",
		color: "red"
	},
	{
		title: "hello world title",
		description: "hello world description of todo item here",
		color: "green"
	},
	{
		title: "hello world title",
		description: "hello world description of todo item here",
		color: "white"
	},
	{
		title: "hello world title",
		description: "hello world description of todo item here",
		color: "black"
	},
	{
		title: "hello world title",
		description: "hello world description of todo item here",
		color: "orange"
	},
	{
		title: "hello world title",
		description: "hello world description of todo item here",
		color: "yellow"
	},
	{
		title: "hello world title",
		description: "hello world description of todo item here",
		color: "purple"
	}];

	const testNotifications: NotificationBoxProps[] = [{
		title: "hello world title",
		content: "hello world description of todo item here",
		time: new Date()
	},{
		title: "Another title",
		content: "Another description of a notification that the user has received and can click for actions related to it.",
		time: new Date()
	},{
		title: "hello world title",
		content: "another hello world item",
		time: new Date()
	}];

	useEffect(() => {
		setTitle("Home");
	}, [setTitle]);

	return <Container>
		<HalfOfContainer>
			<HalfPane  style={{
				border: "0",
				boxShadow: "none"
			}}>
				<ArticleLayout title="Home" innerStyle={{
					width: "100%",
					maxWidth: "100%",
					padding: 0
				}}>
					<h1>
						Welcome back {user.displayName}!
					</h1>
					<hr/>
					<p>
						Dashboard here!
					</p>
				</ArticleLayout>
			</HalfPane>
			<HalfPane style={{
			}}>
				<NotificationBoxContainer>
					{
						testNotifications.map((n) => {
							return <NotificationBox {...n}/>
						})
					}
				</NotificationBoxContainer>
			</HalfPane>
		</HalfOfContainer>
		<HalfOfContainer>
			<HalfPane style={{
				overflowY: "scroll"
			}}>
				<DailyCalendar height={2000} blockStyle={{
					borderBottom: "1px solid #343434"
				}} events={{
					"ABC": {
						id: "ABC",
						start: new Date(Date.now()),
						end: addHours(new Date(Date.now()), 1),
						title: "Hello World Title",
						description: "This would be a description of the event."
					},
					"XYZ": {
						id: "XYZ",
						start: setMinutes(setHours(new Date(), 2), 0),
						end: setMinutes(setHours(new Date(), 4), 0),
						title: "Hello World Title",
						description: "This would be a description of the event."
					}
				}}/>
			</HalfPane>
			<HalfPane style={{
			}}>
				<ScrollContainer>
					<TodoBoxContainer>
						{
							todoItems.map((e) => {
								return <TodoNote title={e.title} description={e.description} color={e.color}/>;
							})
						}
					</TodoBoxContainer>
				</ScrollContainer>
				{/* <Toggle FalseComponent={() => <div>
					FALSE
				</div>} TrueComponent={() => <div>
					TRUE
				</div>}/> */}
			</HalfPane>
		</HalfOfContainer>
	</Container>;
};