import { addDays, getHours, setHours, setMilliseconds, setMinutes, setSeconds, subDays } from "date-fns";

export interface DateRange {
	start: Date;
	end: Date;
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
		end: endOfDate(addDays(date, 7 - date.getDay()))
	}
}

export function getMonthRangeOfDate(date: Date): DateRange {
	return {
		start: startOfDate(new Date(date.getFullYear(), date.getMonth()-1, 1)),
		end: endOfDate(subDays(new Date(date.getFullYear(), date.getMonth()), 1))
	}
}

