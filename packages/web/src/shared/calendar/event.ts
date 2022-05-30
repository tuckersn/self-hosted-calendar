import { SlateNode } from "@internal/schema/dist/serialization";

export interface Event {
	id: string,
	start: Date,
	end: Date,
	title: string,
	description: SlateNode
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