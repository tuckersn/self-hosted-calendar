import styled from "styled-components";

export interface TaskComponentProps {

}


const TaskContainer = styled.div`
	display: flex;
`;

const TaskTitle = styled.h3`
`;

const TaskDescription = styled.p`
	flex: 1;
	width: 100%;
`;

const TaskDetails = styled.div`
`;



export function TaskComponent() {
	return <TaskContainer>
		<div style={{
			flex: 0,
			display: "flex"
		}}>
			<TaskTitle>
				Task Title
			</TaskTitle>
			<TaskDescription>
				Task Description
			</TaskDescription>
		</div>
		<TaskDescription>

		</TaskDescription>

	</TaskContainer>;
}