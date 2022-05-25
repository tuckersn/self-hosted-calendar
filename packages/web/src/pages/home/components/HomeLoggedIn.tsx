import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS, CSS_PRESETS, STYLE_VALUES } from "../../../common/style";
import { Toggle } from "../../../components/inputs/Toggle";
import { ArticleLayout } from "../../../components/layouts/ArticleLayout";
import { useUser } from "../../../common/hooks/useUser";
import { DailyCalendar } from "../../../components/calendars/DailyCalendar";
import { TodoNote, TodoNoteProps } from "../../../components/todos/TodoNote";
import { ScrollContainer } from "../../../components/style/ScrollContainer";

const PADDING = "1vh";

const Container = (styled.div`
	height: 100%;
	display: flex;
	padding: ${PADDING};
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
	border-radius: ${STYLE_VALUES.borderRadiusHeavy}px;
	margin: ${PADDING};
	padding: ${STYLE_VALUES.paddingStandardVertical}px;
	padding-left: ${STYLE_VALUES.paddingStandardHorizontal}px;
	padding-right: ${STYLE_VALUES.paddingStandardHorizontal}px;
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
	}]

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
				Notifications here!
			</HalfPane>
		</HalfOfContainer>
		<HalfOfContainer>
			<HalfPane style={{
			}}>
				<DailyCalendar/>
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