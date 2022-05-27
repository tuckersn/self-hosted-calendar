import { getHours } from "date-fns";

export function getHoursAndMinutes(date: Date): number {
	return getHours(date) + (date.getMinutes() / 60);
}
export function getHoursAndMinutesAndSeconds(date: Date): number {
	return getHours(date) + (date.getMinutes() / 60) + (date.getSeconds() / 3600);
}