import {
  formatDistanceToNow as originalFormatDistanceToNow,
  format as originalFormat,
} from "date-fns";
import { fromZonedTime, toZonedTime, formatInTimeZone } from "date-fns-tz";

// Set your default timezone here - Georgia Standard Time
const DEFAULT_TIMEZONE = "Asia/Tbilisi"; // GMT+4

// Wrapper for formatDistanceToNow with timezone awareness
export const formatDistanceToNow = (
  date: Date | string,
  options?: Parameters<typeof originalFormatDistanceToNow>[1]
) => {
  // Convert string to Date if needed
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // The date is already in local timezone, so we can use it directly
  return originalFormatDistanceToNow(dateObj, {
    ...options,
  });
};

// Wrapper for format with timezone awareness
export const format = (
  date: Date | string,
  formatStr: string,
  options?: any
) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return formatInTimeZone(dateObj, DEFAULT_TIMEZONE, formatStr, options);
};

// Convert UTC date to local timezone
export const toLocalTime = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return toZonedTime(dateObj, DEFAULT_TIMEZONE);
};

// Convert local timezone date to UTC
export const toUTC = (date: Date, timezone: string = DEFAULT_TIMEZONE) => {
  return fromZonedTime(date, timezone);
};

// Export other date-fns functions you might need
export {
  isToday,
  isYesterday,
  startOfDay,
  endOfDay,
  addDays,
  subDays,
  differenceInDays,
  parseISO,
} from "date-fns";

// Utility to get current timezone
export const getCurrentTimezone = () => DEFAULT_TIMEZONE;

// Utility to format date with timezone awareness
export const formatWithTimezone = (
  date: Date | string,
  formatStr: string = "MMM dd, yyyy 'at' HH:mm"
) => {
  return format(date, formatStr);
};

// Utility to check if a date is recent (within last hour)
export const isRecent = (date: Date | string) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInMinutes = (now.getTime() - dateObj.getTime()) / (1000 * 60);
  return diffInMinutes <= 60;
};
