export const stringToDate = (dateString: string): Date => {
	const year = parseInt(dateString.substring(0, 4), 10);
	const month = parseInt(dateString.substring(4, 6), 10) - 1;
	const day = parseInt(dateString.substring(6, 8), 10);
	const hour = parseInt(dateString.substring(9, 11), 10);
	const minute = parseInt(dateString.substring(11, 13), 10);
	const second = parseInt(dateString.substring(13, 15), 10);

	return new Date(Date.UTC(year, month, day, hour, minute, second));
};

export const stringToGuid = (value: string): string => {
	if (!/^[A-Fa-f0-9]{32}$/.test(value)) {
		return value;
	}

	return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`.toLowerCase();
};