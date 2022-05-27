import styled from "styled-components";

import { getHoursAndMinutes, getHoursAndMinutesAndSeconds } from "@internal/common/dist";

import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../../common/style";
import { addHours, getHours, setHours } from "date-fns";
import { ValueOf } from "type-fest";
import { SizeMeProps, withSize, WithSizeProps } from "react-sizeme";
import _ from "lodash";

export const FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY = 24 * (60/15);
export const FIFTEEN_MINUTES_IN_A_DAY = 24 * (60/15);

export interface Event {
	id: string,
	start: Date,
	end: Date,
	title: string,
	description: string
};

export interface EventPosition {
	event: Event;
	/**
	 * 0-100 value, a percentage of size.width;
	 */
	x: number,
	/**
	 * In pixels
	 */
	y: number,
	/**
	 * In pixels
	 */
	height: number,
	/**
	 * 0-100 value, a percentage of size.width;
	 */
	width: number
};
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
	
	events: {[eventId: string]: Event};

	size: SizeMeProps["size"];
}

const DailyCalendarOuterContainer = styled.div`
	flex: 1;
	overflow-x: hidden;
	overflow-y:	hidden;
`;

const DailyCalendarInnerContainer = styled.div`
	position: absolute;
	height: ${(props: DailyCalendarProps) => props.height}px;
	overflow-x: hidden;
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
	user-select: none;
	z-index: 2;
`;



type EventContainerProps = {
	parentProps: DailyCalendarProps,
	event: Event,
	position: EventPosition
}
const EventContainer = styled.div<EventContainerProps>`
	padding: 4px;
	padding-right: 0;
	position: relative;
	right: 0;
	background-color: #ad2d2d;
	border: 1px solid #741111;
	z-index: 2;
	height: ${(props: EventContainerProps) => props.position.height}px;
	overflow: hidden;
	overflow-y: scroll;


`;

const EventTitle = styled.div`
	font-size: 12 px;
	font-weight: bold;
	color: white;
	overflow: hidden;
`;

const EventDescription = styled.div`
	font-size: 10px;
	color: white;
	overflow: hidden;
`;


const Line = styled.div<{y: number}>`
	height: 0px;
	background-color: #ffdd00;
	box-shadow: 0px 2px 2px 2px #f8be00;
	overflow: hidden;
	position: relative;
	top: ${(props: {y: number}) => props.y}px;
	left: ${TIMESTAMP_WIDTH}px;
	z-index: 5;
`;


/**
 * Can be assumed that eventA starts after eventB.
 * eventA.start > eventB.start
 */
function isOverlapping(eventA: Event, eventB: Event): boolean {
	if(eventA.start > eventB.end) {
		// Starts after eventB ends
		return false;
	} else if(eventA.end < eventB.start) {
		// Ends before eventB starts
		return false;
	}
	return true;
}





export function DailyCalendarComponent(props: DailyCalendarProps) {
	const { height, events, size } = props;
	const timeGrouping = props.timeStampGrouping || 4;

	const eventInnerContainerRef = useRef<HTMLDivElement>(null);
	const [timeBlocks, setTimeBlocks] = React.useState<TimeBlockProps[]>([]);
	const [eventPositions, setEventPositions] = React.useState<{[eventId: string]: EventPosition}>({});
	const [fifteenMinuteHeight, setFifteenMinuteHeight] = React.useState<number>(height / FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY);	

	const [eventsKeyArray, setEventsKeyArray] = useState(Object.keys(events).sort((a,b) => {
		return events[a].start.getTime() - events[b].start.getTime();
	}));

	const [lineY, setLineY] = useState<number>((getHoursAndMinutesAndSeconds(new Date())/24) * height);


	useEffect(() => {
		function updateTime() {
			console.log("Update line:", (getHoursAndMinutesAndSeconds(new Date())/24) * height);
			setLineY((getHoursAndMinutesAndSeconds(new Date())/24) * height);
		}
		
		
		const timer = setInterval(() => {
			updateTime();
		}, 1000 * 10);

		

		return () => {
			clearInterval(timer);
		};
	}, [height, setLineY]);

	/**
	 * Update fifteenMinuteHeight on height change and such.
	 */
	useEffect(() => {
		if(height / FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY !== fifteenMinuteHeight) {
			setFifteenMinuteHeight(height / FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY);
		}
	}, [height, fifteenMinuteHeight, setFifteenMinuteHeight]);

	/**
	 * Update eventsKeyArray on events change.
	 */
	useEffect(() => {
		setEventsKeyArray(Object.keys(events).sort((a,b) => {
			return events[a].start.getTime() - events[b].start.getTime();
		}));
	}, [events, setEventsKeyArray]);

	/**
	 * Calculate the position of each event.
	 */
	useEffect(() => {
		const positions: typeof eventPositions = {};
		const slots: number[][] = _.times(FIFTEEN_MINUTES_IN_A_DAY, () => []);
		const slotIndexMap: {[key: string]: number[]} = {};

		for(let i = 0; i < eventsKeyArray.length; i++) {
			const event = events[eventsKeyArray[i]];
			const start = getHoursAndMinutes(event.start);
			const end = getHoursAndMinutes(event.end);

			if(eventsKeyArray[i] in slotIndexMap) {
				throw new Error("Duplicate key");
			}
			slotIndexMap[eventsKeyArray[i]] = [];
			for(let j = Math.ceil(FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY * start / 15); j < Math.ceil(FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY * end / 15); j++) {
				slots[j].push(i);
				slotIndexMap[eventsKeyArray[i]].push(j)
			}
		}

		for(let i = 0; i < slots.length; i++) {
			slots[i] = slots[i].sort((a,b) => {
				const aDur = events[eventsKeyArray[a]].end.getTime() - events[eventsKeyArray[a]].start.getTime();
				const bDur = events[eventsKeyArray[b]].end.getTime() - events[eventsKeyArray[b]].start.getTime();
				return aDur - bDur;
			});
		}

		for(let i = 0; i < eventsKeyArray.length; i++) {
			const event = events[eventsKeyArray[i]];
			
			let widestSlot = 1;
			let biggestSlot = 0;
			
			for(let slot of slotIndexMap[eventsKeyArray[i]]) {
				if(slots[slot].length > widestSlot)
					widestSlot = slots[slot].length;
				const index = slots[slot].indexOf(i);
				if(index + 1 > biggestSlot) {
					biggestSlot = index + 1;
				}
				if(biggestSlot === 0) {
					throw new Error("How?");
				}
			}

			const y = fifteenMinuteHeight * getHoursAndMinutes(event.start) * 4;
			const height = fifteenMinuteHeight * (getHoursAndMinutes(event.end) - getHoursAndMinutes(event.start)) * 4;
			positions[eventsKeyArray[i]] = {
				x: (1 / widestSlot) * (biggestSlot - 1),
				width: 1 / (widestSlot),
				y,
				height,
				event
			}
		}
		//console.log("POS:", JSON.stringify(positions, null, 4), size.width);
		setEventPositions(positions);

	}, [setEventPositions, events, fifteenMinuteHeight, size.width, eventsKeyArray]);

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
	}, [setTimeBlocks, height, timeGrouping, fifteenMinuteHeight]);
	
	return <DailyCalendarOuterContainer  {...props} style={props.containerStyle}>
		<div style={{
			height: 0,
			overflow: "visible"
		}}>
		<Line y={lineY}/>
		{
			Object.keys(events).sort((a,b) => {
				const aDur = events[a].end.getTime() - events[a].start.getTime();
				const bDur = events[b].end.getTime() - events[b].start.getTime();
				return bDur - aDur;
			}).map((k) => {
				if(k in eventPositions) {
					//https://stackoverflow.com/a/40568748
					const width = size.width! - TIMESTAMP_WIDTH;
					return <div key={k} style={{
						height: 0,
						overflow: "visible"
					}}>
						<EventContainer className="thin-scroll-bar" parentProps={props} event={events[k]} position={eventPositions[events[k].id]} style={{
							top: eventPositions[k].y,
							left: (width) * eventPositions[k].x + TIMESTAMP_WIDTH + "px",
							height: eventPositions[k].height,
							width: (width) * eventPositions[k].width + "px"
						}}>
							<EventTitle>
								{events[k].title}
							</EventTitle>
							<EventDescription>
								{events[k].description}
							</EventDescription>
						</EventContainer>
					</div>;
				}
				return null;
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

export const DailyCalendar = withSize({
	monitorHeight: true,
	monitorWidth: true
})(DailyCalendarComponent);