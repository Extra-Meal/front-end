import { format, isSameMonth, isSameWeek, isSameYear, isToday, isYesterday } from "date-fns";

export const formatDate = (time: number | string) => {
	const date = new Date(time);
	const newDate = new Date();

	if (isToday(date)) return "today";
	else if (isYesterday(date)) return "yesterday";
	else if (isSameWeek(date, newDate)) return "previous 7 days";
	else if (isSameMonth(date, newDate)) return "previous 30 days";
	else if (isSameYear(date, newDate)) return format(date, "MMMM");
	else return format(date, "MMMM yyyy");
};

export const timeToAMAndPM = (time: number) => {
	const date = new Date(time);
	return format(date, "h:mm a");
};
