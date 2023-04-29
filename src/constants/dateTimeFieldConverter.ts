
export class DateTimeFieldConverter
{
    ////////////////////////////////////////////////
    // @静态常量
    ////////////////////////////////////////////////

    static readonly MillisecondsPerSecond = 1000;
    static readonly MillisecondsPerMinute = 60000;
    static readonly MillisecondsPerHour = 3600000;
    static readonly MillisecondsPerDay = 86400000;
    static readonly MillisecondsPerMonth = 2592000000;
    static readonly MillisecondsPerYear = 31536000000;

    static readonly SecondsPerMinute = 60;
    static readonly SecondsPerHour = 3600;
    static readonly SecondsPerDay = 86400;
    static readonly SecondsPerMonth = 2592000;
    static readonly SecondsPerYear = 31536000;

    static readonly MinutesPerHour = 60;
    static  readonly MinutesPerDay = 1440;
    static readonly MinutesPerMonth = 43200;
    static readonly MinutesPerYear = 525600;

    static readonly HoursPerDay = 24;
    static readonly HoursPerMonth = 720;
    static readonly HoursPerYear = 8760;

    static readonly DaysPerMonth = 30;
    static readonly DaysPerYear = 365;

    static readonly MonthsPerYear = 12;
}