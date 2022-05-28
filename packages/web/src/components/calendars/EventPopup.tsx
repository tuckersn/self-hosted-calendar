import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { ButtonToggle } from "../inputs/ButtonToggle";
import { TextInput } from "../inputs/TextInput";
import { Popup } from "../style/Popup";
import { Event } from "../../shared/calendar/event";
import { MdEdit } from "react-icons/md";

export interface EventPopupProps {
	event: Event | null;
	active: boolean;
	setActive: (active: boolean) => void;
}

const EventPopupContainer = styled.div`
	flex: 1;
	height: 100%;
	width: 100%;
	position: relative;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
`;

const EventPopupTitle = styled.div`
	font-size: 24px;
	font-weight: bold;
	color: white;
	overflow: hidden;
`;

const EventPopupDescription = styled.div`
	font-size: 18px;
	color: white;
	overflow: hidden;
`;

export function EventPopup(props: EventPopupProps) {
	const { active, setActive, event } = props;

	const [editMode, setEditMode] = useState(false);

	return (
		<Popup active={active} setActive={setActive}>
			<EventPopupContainer>
				{ 
					event === null ? null :	(editMode ? (<React.Fragment>
						<EventPopupTitle>
							<TextInput value={event.title}></TextInput>
						</EventPopupTitle>
						<EventPopupDescription>
							<TextInput value={event.description}></TextInput>
						</EventPopupDescription>
					</React.Fragment>) : 
					<React.Fragment>
						<EventPopupTitle>{event.title}</EventPopupTitle>
						<EventPopupDescription>{event.description}</EventPopupDescription>
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
			</EventPopupContainer>
		</Popup>
	);
}
	