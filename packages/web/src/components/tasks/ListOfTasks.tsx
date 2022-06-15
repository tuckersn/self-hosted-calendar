import { ClientTaskRecord } from "@internal/schema/dist";
import { withSize } from "react-sizeme";
import styled from "styled-components";
import { TaskComponent } from "./TaskComponent";

export interface ListOfTasksProps {
	tasks: ClientTaskRecord[];
	size: {
		width: number;
		height: number;
	};
	minColumns?: number;
	pixelsPerColumn?: number;
}

export const TaskListContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	
`;

export function ListOfTasksComponent(props: ListOfTasksProps) {
	return <TaskListContainer>
		{
			props.tasks.map((task, index) => {
				return <TaskComponent key={task.uuid} widthPercentage={1 / (props.minColumns || 1)} task={task} />;
			})
		}
	</TaskListContainer>;
}



export const ListOfTasks = withSize({
	monitorWidth: true
})(ListOfTasksComponent);