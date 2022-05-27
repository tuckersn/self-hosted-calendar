import styled from "styled-components";

import { getHoursAndMinutes } from "@internal/common/dist";

import React, { useEffect } from "react";
import { COLORS } from "../../common/style";
import { addHours, getHours, setHours } from "date-fns";
import { ValueOf } from "type-fest";

export const FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY = 24 * (60/15);
export interface DailyCalendarProps {
	containerStyle?: React.CSSProperties;
	blockStyle?: React.CSSProperties;
	/**
	 * Height in pixels. Will be divided into
	 * (24 hours / 15 minute = 96) segments.
	 */
	height: number;
	/**
	 * How many 15 minute blocks to group
	 * in the timestamps.
	 */
	timeStampGrouping?: number;
	
	events: {
		[eventId: string]: {
			id: string,
			start: Date,
			end: Date,
			title: string,
			description: string
		}
	};
}

const DailyCalendarOuterContainer = styled.div`
	flex: 1;
`;

const DailyCalendarInnerContainer = styled.div`
	position: absolute;
	height: ${(props: DailyCalendarProps) => props.height}px;
`;

type TimeBlockProps = { 
	timeStampHeight: number, 
	time: Date,
	key: string
};
const TimeBlocksContainer = styled.div<{ index: number } & TimeBlockProps & DailyCalendarProps>`
	height: ${(props: { timeStampHeight: number }) => props.timeStampHeight}px;
	color: grey;
	background-color: ${({ index }) => index % 2 === 0 ? COLORS.backgroundSlightlyDark : COLORS.background};
	
`;

const TIMESTAMP_WIDTH = 75;
const TimeBlockTimestamp = styled.div`
	border-right: 1px solid #343434;
	height: 100%;
	width: ${TIMESTAMP_WIDTH}px;
`;



type EventContainerProps = {
	parentProps: DailyCalendarProps,
	event: ValueOf<DailyCalendarProps["events"]>,
}
const EventContainer = styled.div<EventContainerProps>`
	padding: 4px;
	position: relative;
	right: 0;
	background-color: #ad2d2d;
	border: 1px solid #741111;
`;

const EventTitle = styled.div`
	font-size: 14px;
	font-weight: bold;
	color: white;
`;

const EventDescription = styled.div`
	font-size: 12px;
	color: white;
`;




export function DailyCalendar(props: DailyCalendarProps) {
	const { height, events } = props;
	const timeGrouping = props.timeStampGrouping || 4;

	const [timeBlocks, setTimeBlocks] = React.useState<TimeBlockProps[]>([]);
	const [eventPositions, setEventPositions] = React.useState<{[eventId: string]: {
		y: number,
		height: number,
		width: number
	}}>({});
	const [fifteenMinuteHeight, setFifteenMinuteHeight] = React.useState<number>(height / FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY);	

	/**
	 * Update fifteenMinuteHeight on height change and such.
	 */
	useEffect(() => {
		if(height / FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY !== fifteenMinuteHeight) {
			setFifteenMinuteHeight(height / FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY);
		}
	}, [height, fifteenMinuteHeight, setFifteenMinuteHeight]);

	/**
	 * Calculate the position of each event.
	 */
	useEffect(() => {
		const positions: typeof eventPositions = {};

		for(let eventKey of Object.keys(events)) {
			const event = events[eventKey];
			const y = fifteenMinuteHeight * getHoursAndMinutes(event.start) * 4;
			const height = fifteenMinuteHeight * (getHoursAndMinutes(event.end) - getHoursAndMinutes(event.start)) * 4;
			const width = 100;
			positions[event.id] = {
				y,
				height,
				width
			};
			console.log("POSITION:", positions[event.id], event.id, getHoursAndMinutes(event.start), getHoursAndMinutes(event.end), (getHoursAndMinutes(event.end) - getHoursAndMinutes(event.start)) * 4);
		}

		setEventPositions(positions);
	}, [setEventPositions, events, fifteenMinuteHeight]);

	/**
	 * Generates time blocks and calculate the height of each block.
	 */
	useEffect(() => {
		const timeStamps: TimeBlockProps[] = [];
		for(let i = 0; i < (FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY / timeGrouping); i++) {
			timeStamps.push({
				key: ((fifteenMinuteHeight * timeGrouping) * i).toString(),
				timeStampHeight: fifteenMinuteHeight * timeGrouping,
				time: new Date(0, 0, 0, 0, i * 15 * timeGrouping)
			});
		}
		setTimeBlocks(timeStamps);
	}, [setTimeBlocks, height, timeGrouping]);
	
	return <DailyCalendarOuterContainer {...props} style={props.containerStyle}>
		<div style={{
			height: 0
		}}>
		{
			Object.keys(events).map((k) => {
				if(k in eventPositions) {
					return <div style={{
						height: 0
					}}>
						<EventContainer parentProps={props} event={events[k]} key={k} style={{
							top: eventPositions[k].y,
							left: TIMESTAMP_WIDTH,
							height: eventPositions[k].height,
							width: `calc(${eventPositions[k].width}% - ${TIMESTAMP_WIDTH}px)`
						}}>
							<EventTitle>
								{events[k].title}
							</EventTitle>
							<EventDescription>
								{events[k].description}
								<br/>
								{events[k].start.toLocaleTimeString()} - {events[k].end.toLocaleTimeString()}
							</EventDescription>
						</EventContainer>
					</div>;
				}
			})
		}
		</div>
		{
			timeBlocks.map((timeStamp, i) => {
				return <TimeBlocksContainer index={i} {...timeStamp} {...props} style={props.blockStyle}>
					<TimeBlockTimestamp>
						{
							timeStamp.time.toLocaleTimeString("en-US", {
								hour: "numeric",
								minute: "numeric"
							})
						}
					</TimeBlockTimestamp>
				</TimeBlocksContainer>
			})
		}
	</DailyCalendarOuterContainer>;
}