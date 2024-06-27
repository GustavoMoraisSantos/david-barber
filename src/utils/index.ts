import moment from "moment";

export const combineDateAndTime = (date: Date, timeStr: string) => {
  if (!timeStr) return null;

  timeStr = timeStr.slice(0, 5);

  const time = moment(timeStr, "HH:mm");

  return moment(date).hour(time.hour()).minute(time.minute()).toDate();
};
