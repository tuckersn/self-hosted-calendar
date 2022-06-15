import { ClientTaskRecord } from "@internal/schema/dist";
import styled from "styled-components";

export interface TaskComponentProps {
	task: ClientTaskRecord;
	widthPercentage?: number;
}


const TaskContainer = styled.div<TaskComponentProps>`
	display: flex;
	flex-direction: column;
	flex: ${props => (props.widthPercentage || 1) * 100}%;
	border: 1px solid grey;
`;

const TaskTitle = styled.h3`
`;

const TaskDescription = styled.p`
	flex: 1;
	width: 100%;
`;

const TaskDetails = styled.div`
`;



export function TaskComponent(props: TaskComponentProps) {
	const { task } = props;

	return <TaskContainer {...props}>
		<div style={{
			flex: 0,
			display: "flex"
		}}>
			<TaskTitle>
				{ task.title }
			</TaskTitle>
			<TaskDetails>
				{ task.due?.toLocaleDateString() }
			</TaskDetails>
		</div>
		<TaskDescription>
			description
		</TaskDescription>

	</TaskContainer>;
}