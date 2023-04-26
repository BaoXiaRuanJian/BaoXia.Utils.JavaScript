import { DateTimeFieldConverter } from "../constants/dateTimeFieldConverter.js";

export class DateTimeSpan
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    years: number = 0;
    months: number = 0;
    days: number = 0;
    hours: number = 0;
    minutes: number = 0;
    seconds: number = 0;
    milliseconds: number = 0;

    get totalYears(): number
    {
        return this.years
            + this.months / DateTimeFieldConverter.MonthsPerYear
            + this.days / DateTimeFieldConverter.DaysPerYear
            + this.hours / DateTimeFieldConverter.HoursPerYear
            + this.minutes / DateTimeFieldConverter.MinutesPerYear
            + this.seconds / DateTimeFieldConverter.SecondsPerYear
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerYear;
    }

    set totalYears(years: number)
    {
        // ⚠ 注意，除法存在计算误差，所以基于乘法，使用“set totalMilliseconds”来更新合计时间值 ⚠
        this.totalMilliseconds = years * DateTimeFieldConverter.MillisecondsPerYear;
    }

    get totalMonths(): number
    {
        return this.years * DateTimeFieldConverter.MonthsPerYear
            + this.months
            + this.days / DateTimeFieldConverter.DaysPerMonth
            + this.hours / DateTimeFieldConverter.HoursPerMonth
            + this.minutes / DateTimeFieldConverter.MinutesPerMonth
            + this.seconds / DateTimeFieldConverter.SecondsPerMonth
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerMonth;
    }

    set totalMonths(months: number)
    {
        this.totalMilliseconds = months * DateTimeFieldConverter.MillisecondsPerMonth;
    }

    get totalDays(): number
    {
        return this.years * DateTimeFieldConverter.DaysPerYear
            + this.months * DateTimeFieldConverter.DaysPerMonth
            + this.days
            + this.hours / DateTimeFieldConverter.HoursPerDay
            + this.minutes / DateTimeFieldConverter.MinutesPerDay
            + this.seconds / DateTimeFieldConverter.SecondsPerDay
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerDay;
    }

    set totalDays(days: number)
    {
        this.totalMilliseconds = days * DateTimeFieldConverter.MillisecondsPerDay;
    }

    get totalHours(): number
    {
        return this.years * DateTimeFieldConverter.HoursPerYear
            + this.months * DateTimeFieldConverter.HoursPerMonth
            + this.days * DateTimeFieldConverter.HoursPerDay
            + this.hours
            + this.minutes / DateTimeFieldConverter.MinutesPerHour
            + this.seconds / DateTimeFieldConverter.SecondsPerHour
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerHour;
    }

    set totalHours(hours: number)
    {
        this.totalMilliseconds = hours * DateTimeFieldConverter.MillisecondsPerHour;
    }

    get totalMinutes(): number
    {
        return this.years * DateTimeFieldConverter.MinutesPerYear
            + this.months * DateTimeFieldConverter.MinutesPerMonth
            + this.days * DateTimeFieldConverter.MinutesPerDay
            + this.hours * DateTimeFieldConverter.MinutesPerHour
            + this.minutes
            + this.seconds / DateTimeFieldConverter.SecondsPerMinute
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerMinute;
    }

    set totalMinutes(minutes: number)
    {
        this.totalMilliseconds = minutes * DateTimeFieldConverter.MillisecondsPerMinute;
    }

    get totalSeconds(): number
    {
        return this.years * DateTimeFieldConverter.SecondsPerYear
            + this.months * DateTimeFieldConverter.SecondsPerMonth
            + this.days * DateTimeFieldConverter.SecondsPerDay
            + this.hours * DateTimeFieldConverter.SecondsPerHour
            + this.minutes * DateTimeFieldConverter.SecondsPerMinute
            + this.seconds
            + this.milliseconds / DateTimeFieldConverter.MillisecondsPerSecond;
    }

    set totalSeconds(seconds: number)
    {
        this.totalMilliseconds = seconds * DateTimeFieldConverter.MillisecondsPerSecond;
    }

    get totalMilliseconds(): number
    {
        return this.years * DateTimeFieldConverter.MillisecondsPerYear
            + this.months * DateTimeFieldConverter.MillisecondsPerMonth
            + this.days * DateTimeFieldConverter.MillisecondsPerDay
            + this.hours * DateTimeFieldConverter.MillisecondsPerHour
            + this.minutes * DateTimeFieldConverter.MillisecondsPerMinute
            + this.seconds * DateTimeFieldConverter.MillisecondsPerSecond
            + this.milliseconds;
    }

    set totalMilliseconds(milliseconds: number)
    {
        let years = Math.floor(milliseconds / DateTimeFieldConverter.MillisecondsPerYear);
        {
            this.years = years;
        }
        milliseconds -= years * DateTimeFieldConverter.MillisecondsPerYear;
        
        let months = Math.floor(milliseconds / DateTimeFieldConverter.MillisecondsPerMonth);
        {
            this.months = months;
        }
        milliseconds -= months * DateTimeFieldConverter.MillisecondsPerMonth;

        let days = Math.floor(milliseconds / DateTimeFieldConverter.MillisecondsPerDay);
        {
            this.days = days;
        }
        milliseconds -= days * DateTimeFieldConverter.MillisecondsPerDay;

        let hours = Math.floor(milliseconds / DateTimeFieldConverter.MillisecondsPerHour);
        {
            this.hours = hours;
        }
        milliseconds -= hours * DateTimeFieldConverter.MillisecondsPerHour;

        let minutes = Math.floor(milliseconds / DateTimeFieldConverter.MillisecondsPerMinute);
        {
            this.minutes = minutes;
        }
        milliseconds -= minutes * DateTimeFieldConverter.MillisecondsPerMinute;

        let seconds = Math.floor(milliseconds / DateTimeFieldConverter.MillisecondsPerSecond);
        {
            this.seconds = seconds;
        }
        milliseconds -= seconds * DateTimeFieldConverter.MillisecondsPerSecond;

        this.milliseconds = milliseconds;
    }

    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        milliseconds: number = 0,
        seconds: number = 0,
        minutes: number = 0,
        hours: number = 0,
        days: number = 0,
        months: number = 0,
        years: number = 0)
    {
        this.totalMilliseconds
            = milliseconds
            + seconds * DateTimeFieldConverter.MillisecondsPerSecond
            + minutes * DateTimeFieldConverter.MillisecondsPerMinute
            + hours * DateTimeFieldConverter.MillisecondsPerHour
            + days * DateTimeFieldConverter.MillisecondsPerDay
            + months * DateTimeFieldConverter.MillisecondsPerMonth
            + years * DateTimeFieldConverter.MillisecondsPerYear;
    }
}