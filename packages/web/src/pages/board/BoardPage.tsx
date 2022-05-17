import styled from "styled-components";

const BoardContainer = (styled.div`
	height: 100%;
	width: 100%;
	display: flex;
`);

export const SidePanel = (styled.div`
	flex: 20%;
	border-right: 1px solid white;
`);

export const EditorPanel = (styled.div`
	flex: 80%;
`);

export function BoardPage() {
	return <BoardContainer>
		<SidePanel>
			Side panel here
			<br/><br/>
			Could select the following:
			<ul>
				<li>Board 1</li>
				<li>Board 2</li>
				<li>Board 3</li>
				<li>Board of a project</li>
				<li>Board of calendars</li>
			</ul>
		</SidePanel>
		<EditorPanel>
			Board page editor component placeholder
			<br/>
			<a href="https://www.npmjs.com/package/react-grid-layout">Probably going to use https://www.npmjs.com/package/react-grid-layout</a>
		</EditorPanel>
	</BoardContainer>;
}