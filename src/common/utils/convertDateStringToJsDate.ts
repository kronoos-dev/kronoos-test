import moment from "moment";

export const convertDateStringToJsDate = (value: string) => {
  const data = { date: value, time: "00:00" };
  const joined = `${data.date}${data.time}`;
  return moment(joined, "YYYYMMDDh:mm:ss").toDate();
};
