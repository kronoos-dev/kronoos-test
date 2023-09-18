/**
 * @param {String} dateString The string whos will be converted to Date
 * @returns {Date}
 */
export const convertStringToDate = (dateString) => { 
  const lengths = [4, 2, 2];
  const dateArray = lengths.map((length, index) => {
    const offset = lengths.slice(0, index + 1).reduce((accum, value) => accum + value, 0);
    return dateString.slice(offset - length, offset);
  });

  return new Date(dateArray.join('-'));
}