import { getHours } from "date-fns";

export function getHoursAndMinutes(date: Date): number {
	return getHours(date) + (date.getMinutes() / 60);
}