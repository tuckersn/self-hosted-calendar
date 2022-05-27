import styled from "styled-components";

import { getHoursAndMinutes } from "@internal/common/dist";

import React, { useEffect, useRef } from "react";
import { COLORS } from "../../common/style";
import { addHours, getHours, setHours } from "date-fns";
import { ValueOf } from "type-fest";
import { SizeMeProps, withSize, WithSizeProps } from "react-sizeme";

export const FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY = 24 * (60/15);

export interface Event {
	id: string,
	start: Date,
	end: Date,
	title: string,
	description: string
};

export interface EventPosition {
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
	width: number,
	/**
	 * Event id array
	 */
	leftCollisions: string[],
	/**
	 * Event id array
	 */
	collisions: string[]
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
}
const EventContainer = styled.div<EventContainerProps>`
	padding: 4px;
	position: relative;
	right: 0;
	background-color: #ad2d2d;
	border: 1px solid #741111;
	z-index: 2;
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

		const eventKeysSorted = Object.keys(events).sort((a,b) => {
			return events[a].start.getTime() - events[b].start.getTime();
		});

		// If start of event is before the end of another
		// add a collision entry for both events.

		const eventArr = Object.values(events);
		for(let i = 0; i < eventKeysSorted.length; i++) {
			const key = eventKeysSorted[i];
			const event = events[key];
			if(event) {
				const leftCollisions: string[] = [];
				const collisions: string[] = [];
				// Leaving it blank for the next loop
				
				for(let j = 0; j < i; j++) {
					if(isOverlapping(event, events[eventKeysSorted[j]])) {
						// Start is after the start of the other event and within it's range.
						// this means that they collide.
						collisions.push(eventKeysSorted[j]);
						leftCollisions.push(eventKeysSorted[j]);
						positions[eventKeysSorted[j]].collisions.push(key);
					}
				}

				//TODO: really need a better algorithm.
				positions[event.id] = {
					x: 0,
					y: 0,
					height: 0,
					width: 0,
					collisions,
					leftCollisions
				};
			}
		}

		for(let i = 0; i < eventKeysSorted.length; i++) {
			const key = eventKeysSorted[i];
			const event = events[key];
			const eventPosition = positions[event.id];
			const x = 1 - 1 / (eventPosition.collisions.length - eventPosition.leftCollisions.length + 1);
			const y = fifteenMinuteHeight * getHoursAndMinutes(event.start) * 4;
			const height = fifteenMinuteHeight * (getHoursAndMinutes(event.end) - getHoursAndMinutes(event.start)) * 4;
			const width = 1 / (eventPosition.collisions.length + 1);
			console.log("WIDTH:", width);
			positions[event.id] = {
				x,
				y,
				height,
				width,
				leftCollisions: positions[event.id].leftCollisions,
				collisions: positions[event.id].collisions
			};

			console.log("POSITION:", positions[event.id], event.id, getHoursAndMinutes(event.start), getHoursAndMinutes(event.end), (getHoursAndMinutes(event.end) - getHoursAndMinutes(event.start)) * 4);
		}
		
		console.log("POS:", JSON.stringify(positions, null, 4));
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
	}, [setTimeBlocks, height, timeGrouping, fifteenMinuteHeight]);
	
	return <DailyCalendarOuterContainer {...props} style={props.containerStyle}>
		<div style={{
			height: 0,
			overflow: "visible"
		}}>
		{
			Object.keys(events).map((k) => {
				if(k in eventPositions) {
					//https://stackoverflow.com/a/40568748
					const width = size.width! - TIMESTAMP_WIDTH;
					return <div key={k} style={{
						height: 0,
						overflow: "visible"
					}}>
						<EventContainer parentProps={props} event={events[k]} style={{
							top: eventPositions[k].y,
							left: Math.floor(width * eventPositions[k].x + TIMESTAMP_WIDTH) + "px",
							height: eventPositions[k].height,
							width: Math.floor(width * eventPositions[k].width) + "px"
						}}>
							<EventTitle>
								{events[k].title}
							</EventTitle>
							<EventDescription>
								{events[k].description}
								<br/>
								{events[k].start.toLocaleTimeString()} - {events[k].end.toLocaleTimeString()}
								<br/>
								{eventPositions[k].x} {size.width}
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