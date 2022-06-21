import { Interval, addDays, getHours, setHours, setMilliseconds, setMinutes, setSeconds, subDays } from "date-fns";

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

export function getWeekRangeOfDate(date: Date): Interval {
    return {
        start: startOfDate(new Date(date.getFullYear(), date.getMonth(), 0)),
        end: endOfDate(addDays(date, date.getDay()))
    }
}

//TODO: Consider varying days in each month via date-fns package.
export function getMonthRangeOfDate(date: Date): Interval {
    return {
        start: startOfDate(new Date(date.getFullYear(), date.getMonth()-1, date.getDay())),
        end: endOfDate(subDays(new Date(date.getFullYear(), date.getMonth()), date.getDay()))
    }
}

