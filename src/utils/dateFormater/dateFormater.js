const { parse } = require("date-fns");

const formattedDate = (dateString) => {
  const date = parse(dateString, "yyyyMMdd", new Date());

  return date;
};

module.exports = {
  formattedDate
}