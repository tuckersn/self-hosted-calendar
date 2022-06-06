import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import styled from "styled-components";
import { ButtonToggle } from "../../inputs/ButtonToggle";
import { TextInput } from "../../inputs/TextInput";
import { Popup } from "../../style/Popup";
import { Event } from "../../../shared/calendar/event";
import { MdEdit } from "react-icons/md";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { createEditor, Descendant } from "slate";
import { TextEditor } from "../../inputs/TextEditor";
import { Button, TextField } from "@mui/material";

import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { apiRequest } from "../../../common/api/api-request";
import { slateNodeFromStr } from "@internal/schema/dist/serialization";
import { SlateNodeRender } from "../../../shared/slate/SlateNodeRender";

export interface EventEditPopupProps {
	event: Event | null;
	active: boolean;
	setActive: (active: boolean) => void;
}

const EventEditPopupContainer = styled.div`
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

const EventEditPopupTitle = styled.div`
	font-size: 24px;
	font-weight: bold;
	color: white;
	overflow: hidden;
`;

const EventEditPopupDescription = styled.div`
	font-size: 18px;
	color: white;
	overflow: hidden;
`;


export function EventEditPopup(props: EventEditPopupProps) {
	const { active, setActive, event } = props;
	const [editMode, setEditMode] = useState(false);

	const [title, setTitle] = useState(event ? event.title : "");
	const [description, setDescription] = useState(event ? event.description : slateNodeFromStr(""));
	const [errorText, setErrorText] = useState("");

	useEffect(() => {
		if (event) {
			setTitle(event.title);
			setDescription(event.description);
		}
	}, [setTitle, event, event?.title]);


	return (
		<Popup active={active} setActive={setActive} closeOnClickOutside={!editMode}>
			<EventEditPopupContainer>
				{ 
					event === null ? null :	(editMode ? (<React.Fragment>
						<EventEditPopupTitle>
							Editing {title}
						</EventEditPopupTitle>
						
						<TextInput label="Title" value={title} onChange={(e) => {
							setTitle(e.target.value);
						}}></TextInput>
						{/* <TextInput label="Description" value={description} onValueChange={(v) => {
							setDescription(v);
						}}></TextInput> */}
						<TextEditor value={[description] as any} valueCb={(e) => {
							setDescription(e[0]);
						}} outerStyle={{
							flex: 1
						}}/>
						<div style={{
							padding: "8px",
							marginTop: "8px",
							height: "100px",
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-evenly",
							alignItems: "center"
						}}>
							<DesktopDateTimePicker
								label="Start Date"
								inputFormat="MM/dd/yyyy"
								value={event.start}
								onChange={(e) => {
									console.log("date changed:", e);
								}}
								renderInput={(params) => <TextField {...params} />}
							/>

							<DesktopDateTimePicker
								label="End Date"
								inputFormat="MM/dd/yyyy"
								value={event.start}
								onChange={(e) => {
									console.log("date changed:", e);
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</div>

						<div style={{
							fontSize: "14px",
							color: "grey",
						}}>
							Event id: {event.id}
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
							
								const res = await apiRequest("POST", `/api/event/${event.id}`, {
									body: {
										id: event.id,
										title: title,
										description: description,
										start: event.start,
										end: event.end
									}
								}).catch((e) => {
									console.log("E:", e);	
								});

								if(res && res.status === 404) {
									setErrorText("Event not found");
								} else {
									console.log("RES:", res);
									setActive(false);
								}
							}}>
								Save
							</Button>
						</div>
					</React.Fragment>) : 
					<React.Fragment>
						<EventEditPopupTitle>
							{event.title}
						</EventEditPopupTitle>
						<EventEditPopupDescription>
							<SlateNodeRender node={event.description}/>
						</EventEditPopupDescription>
						<div>{event.start.toLocaleDateString()} to {event.end.toLocaleDateString()}</div>
						<div style={{
							fontSize: "14px",
							color: "grey",
						}}>Event id: {event.id}</div>
						<Button variant="contained" style={{
							position: "absolute",
							right: "8px",
							bottom: "8px"
						}} onClick={() => {
							setActive(false);
						}}>
							Close
						</Button>
					</React.Fragment>)
				}
				<div style={{
					position: "absolute",
					top: 0,
					right: 0
				}}>
					
					<ButtonToggle small active={editMode} setActive={setEditMode}>
						<MdEdit size={18}/>
					</ButtonToggle>
				</div>
			</EventEditPopupContainer>
		</Popup>
	);
}
	