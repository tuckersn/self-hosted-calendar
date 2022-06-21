import { Interval, addDays, getHours, setDay, setHours, setMilliseconds, setMinutes, setSeconds, subDays } from "date-fns"

const START_OF_WEEK = 0
const END_OF_WEEK = 6

export function getHoursAndMinutes(date: Date): number {
    return date.getHours() + date.getMinutes() / 60
}

export function getHoursAndMinutesAndSeconds(date: Date): number {
    return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600
}

export function startOfDate(date: Date): Date {
    return setMilliseconds(setSeconds(setMinutes(setHours(date, 0), 0), 0), 0)
}

export function endOfDate(date: Date): Date {
    return setMilliseconds(setSeconds(setMinutes(setHours(date, 23), 59), 59), 999)
}

export function getWeekRangeOfDate(date: Date): Interval {
    return {
        start: startOfDate(new Date(date.setDate(date.getDate() - date.getDay() - START_OF_WEEK))),
        end: endOfDate(new Date(date.setDate(date.getDate() - date.getDay() + END_OF_WEEK)))
    }
}

export function getMonthRangeOfDate(date: Date): Interval {
    return {
        start: startOfDate(new Date(date.getFullYear(), date.getMonth()-1, date.getDay())),
        end: endOfDate(subDays(new Date(date.getFullYear(), date.getMonth()), date.getDay()))
    }
}

