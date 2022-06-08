import { addDays, getHours, setHours, setMilliseconds, setMinutes, setSeconds, subDays } from "date-fns";

export interface DateRange {
	start: Date;
	end: Date;
}


export enum DayOfWeek {
	SUNDAY = 0,
	MONDAY = 1,
	TUESDAY = 2,
	WEDNESDAY = 3,
	THURSDAY = 4,
	FRIDAY = 5,
	SATURDAY = 6
}

export function numericDayOfWeek(dayOfWeek: string): number {
	dayOfWeek = dayOfWeek.toLowerCase();
	dayOfWeek = dayOfWeek.trim();
	switch (dayOfWeek) {
		case "sunday":
			return DayOfWeek.SUNDAY;
		case "monday":
			return DayOfWeek.MONDAY;
		case "tuesday":
			return DayOfWeek.TUESDAY;
		case "wednesday":
			return DayOfWeek.WEDNESDAY;
		case "thursday":
			return DayOfWeek.THURSDAY;
		case "friday":
			return DayOfWeek.FRIDAY;
		case "saturday":
			return DayOfWeek.SATURDAY;
		default:
			throw new Error("Invalid day of week");
	}
}

export function dayOfWeekToString(dayOfWeek: DayOfWeek): string {
	switch (dayOfWeek) {
		case DayOfWeek.SUNDAY:
			return "Sunday";
		case DayOfWeek.MONDAY:
			return "Monday";
		case DayOfWeek.TUESDAY:
			return "Tuesday";
		case DayOfWeek.WEDNESDAY:
			return "Wednesday";
		case DayOfWeek.THURSDAY:
			return "Thursday";
		case DayOfWeek.FRIDAY:
			return "Friday";
		case DayOfWeek.SATURDAY:
			return "Saturday";
		default:
			throw new Error("Invalid day of week");
	}
}

export function getHoursAndMinutes(date: Date): number {
	return getHours(date) + (date.getMinutes() / 60);
}

export function getHoursAndMinutesAndSeconds(date: Date): number {
	return getHours(date) + (date.getMinutes() / 60) + (date.getSeconds() / 3600);
}

export function startOfDate(date: Date): Date {
	return setMilliseconds(setSeconds(setMinutes(setHours(date, 0), 0), 0), 0);
}

export function endOfDate(date: Date): Date {
	return setMilliseconds(setSeconds(setMinutes(setHours(date, 23), 59), 59), 999);
}

export function getWeekRangeOfDate(date: Date): DateRange {
	return {
		start: startOfDate(subDays(date, date.getDay())),
		end: endOfDate(addDays(date, 6 - date.getDay()))
	}
}

export function getMonthRangeOfDate(date: Date): DateRange {
	return {
		start: startOfDate(new Date(date.getFullYear(), date.getMonth(), 1)),
		end: endOfDate(subDays(new Date(date.getFullYear(), date.getMonth() + 1), 1))
	}
}

