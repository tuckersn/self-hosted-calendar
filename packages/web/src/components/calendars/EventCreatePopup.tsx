import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import styled from "styled-components";
import { ButtonToggle } from "../inputs/ButtonToggle";
import { TextInput } from "../inputs/TextInput";
import { Popup } from "../style/Popup";
import { Event } from "../../shared/calendar/event";
import { MdEdit } from "react-icons/md";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor, Descendant } from "slate";
import { TextEditor } from "../inputs/TextEditor";
import { Button } from "@mui/material";
import { apiRequest } from "../../common/api/api-request";
import { SlateEditorNode, SlateNode, slateNodeFromStr, SlateNodeType } from "@internal/schema/dist/serialization";

export interface EventCreatePopupProps {
	active: boolean;
	setActive: (active: boolean) => void;
}

const EventCreateContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	position: relative;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;

	>* {
		margin-top: 16px;
	}
`;

const EventCreateTitle = styled.div`
	font-size: 24px;
	font-weight: bold;
	color: white;
	overflow: hidden;
`;

const EventCreateDescription = styled.div`
	font-size: 18px;
	color: white;
	overflow: hidden;
`;


export function EventCreatePopup(props: EventCreatePopupProps) {
	const { active, setActive } = props;
	const [editMode, setEditMode] = useState(false);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState<SlateEditorNode>({
		type: SlateNodeType.EDITOR,
		children: [slateNodeFromStr("")]
	});
	const [errorText, setErrorText] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());



	return (
		<Popup active={active} setActive={setActive}>
			<EventCreateContainer>
				<EventCreateTitle>
					Editing {title}
				</EventCreateTitle>
				
				<TextInput label="Title" value={title} onChange={(e) => {
					setTitle(e.target.value);
				}}></TextInput>
				{/* <TextInput label="Description" value={description} onValueChange={(v) => {
					setDescription(v);
				}}></TextInput> */}
				<TextEditor value={[description] as any} valueCb={(e) => {
					setDescription({
						type: SlateNodeType.EDITOR,
						children: e
					});
				}} outerStyle={{
					flex: 1
				}}/>
				<div style={{
					border: "1px solid white",
					padding: "8px",
					marginTop: "8px",
					height: "100px"
				}}>
					Time picker would go here: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
				</div>


				<div style={{
					display: "flex",
					width: "100%"
				}}>

					<Button variant="outlined" onClick={() => {
						setActive(false);
					}}>
						Close
					</Button>

					<Button variant="outlined" onClick={() => {
						setActive(false);
					}}>
						Revert
					</Button>
					<p style={{
						color: "red",
						fontSize: "14px",
						alignSelf: "flex-end",
						marginLeft: "auto"
					}}>
						{errorText}
					</p>
					<Button style={{
						alignSelf: "flex-end",
						marginLeft: "auto"
					}} variant="contained" onClick={async () => {
						//TODO: sanitization of URL
					
						const res = await apiRequest("POST", `/api/event`, {
							body: {
								title: title,
								description: description,
								start: startDate,
								end: endDate
							}
						}).catch((e) => {
							console.log("E:", e);	
						});

						if(res && res.status === 404) {
							setErrorText("Event not found");
						} else {
							setActive(false);
						}
					}}>
						Save
					</Button>
				</div>
				<div style={{
					position: "absolute",
					top: 0,
					right: 0
				}}>
					
					<ButtonToggle small active={editMode} setActive={setEditMode}>
						<MdEdit size={18}/>
					</ButtonToggle>
				</div>
			</EventCreateContainer>
		</Popup>
	);
}
	