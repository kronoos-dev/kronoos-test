const convertToDate = (dateString) => {
  const year = dateString.substr(0, 4);
  const month = dateString.substr(4, 2);
  const day = dateString.substr(6, 2);
  return new Date(`${year}-${month}-${day}`);
};

module.exports = { convertToDate }