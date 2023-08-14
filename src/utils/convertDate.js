const convertDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const date = new Date(year, month, day);

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

module.exports = convertDate;