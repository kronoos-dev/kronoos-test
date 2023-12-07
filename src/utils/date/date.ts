function stringToDate(dateToConvert:string, regInputFrom:RegExp = /^(\d{4})(\d{2})(\d{2})$/) {
    const match = dateToConvert.match(regInputFrom);

    if (!match) {
        return false
    }

    const [, year, month, day] = match;

    const formattedDate = new Date(`${year}-${month}-${day}`);
    if (isNaN(formattedDate.getTime())) {
        return false
    }

    return formattedDate;
}

export {stringToDate}