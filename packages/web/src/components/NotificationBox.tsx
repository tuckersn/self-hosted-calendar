import { MdDelete, MdStar } from "react-icons/md";
import styled from "styled-components";
import { COLORS, CSS_PRESETS } from "../common/style";
import { Button } from "./inputs/Button";

export interface NotificationBoxProps {
	style?: React.CSSProperties;
	title: string;
	content: string;
	time: Date;
}

const Title = styled.div`
	font-size: ${CSS_PRESETS.fontSize.large};
`;

const Content = styled.div`
	font-size: ${CSS_PRESETS.fontSize.small};
	color: #8b8b8b;
`;

const NotificationContainer = styled.div`
	height: min-content;
	flex: 0;
	width: 100%;
	display: flex;
	flex-direction: row;
`;

const NotificationTimeContainer = styled.div`
	flex: 0 0 75px;
	font-size: 0.65em;
	color: grey;
	display: flex;
	align-content: center;
	justify-content: center;
	vertical-align: middle;
	background-color: ${COLORS.backgroundDark};
`;

const NotificationContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	background-color: ${COLORS.backgroundSlightlyDark};
	padding: 8px;
`;

// const NotificationActionContainer = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	align-items: center;
// 	flex: 0;
// 	background-color: ${COLORS.backgroundDark};
// `;

export function NotificationBox(props: NotificationBoxProps) {
	return <NotificationContainer className="NotificationContainer">
		<NotificationTimeContainer>
			<p style={{
				height: "min-content",
				width: "min-content",
				margin: "auto"
			}}>
				{props.time.toLocaleString()}
			</p>
		</NotificationTimeContainer>
		<NotificationContentContainer>
			<Title>
				{props.title}
			</Title>
			<Content>
				{props.content}
			</Content>
		</NotificationContentContainer>
		{/* <NotificationActionContainer>
			<Button>
				<MdDelete/>
			</Button>
			<Button>
				<MdStar/>
			</Button>
		</NotificationActionContainer> */}
	</NotificationContainer>;
}