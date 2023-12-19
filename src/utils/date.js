function YYYYMMDDToDate(dateString) {
	// Check if the input is a non-empty string
	if (typeof dateString !== 'string' || dateString.trim() === '') {
		return null;
	}

	// Extract year, month, and day components
	var year = parseInt(dateString.substr(0, 4), 10);
	var month = parseInt(dateString.substr(4, 2), 10) - 1; // Months are 0-based
	var day = parseInt(dateString.substr(6, 2), 10);

	// Create a new Date object and check for validity
	var dateObject = new Date(year, month, day);

	// Check if the date is valid
	if (
		dateObject.getFullYear() === year &&
		dateObject.getMonth() === month &&
		dateObject.getDate() === day
	) {
		return dateObject;
	} else {
		return null;
	}
}

module.exports = { YYYYMMDDToDate };
