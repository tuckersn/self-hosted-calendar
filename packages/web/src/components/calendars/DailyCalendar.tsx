import styled from "styled-components";

import { forLoop } from "@internal/common/dist";
import React, { useEffect } from "react";
import { COLORS } from "../../common/style";

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

export function DailyCalendar(props: DailyCalendarProps) {

	const [timeBlocks, setTimeBlocks] = React.useState<TimeBlockProps[]>([]);

	const { height } = props;
	const timeGrouping = props.timeStampGrouping || 4;

	useEffect(() => {
		const timeStamps: TimeBlockProps[] = [];
		for(let i = 0; i < (FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY / timeGrouping); i++) {
			timeStamps.push({
				key: ((height / FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY * timeGrouping) * i).toString(),
				timeStampHeight: height / FIFTEEN_MINUTE_SEGMENTS_IN_A_DAY * timeGrouping,
				time: new Date(0, 0, 0, 0, i * 15 * timeGrouping)
			});
		}
		setTimeBlocks(timeStamps);
	}, [setTimeBlocks, height, timeGrouping]);
	
	return <DailyCalendarOuterContainer {...props} style={props.containerStyle}>
			{
				timeBlocks.map((timeStamp, i) => {
					return <TimeBlocksContainer index={i} {...timeStamp} {...props} style={props.blockStyle}>
						<div>{timeStamp.time.toLocaleTimeString()}</div>
					</TimeBlocksContainer>
				})
			}
	</DailyCalendarOuterContainer>;
}