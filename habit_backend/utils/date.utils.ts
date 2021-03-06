import moment from "moment";
export const getMonday = (offset = 0) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  console.log(currentDay - 1);
  const mostRecentMondayDate = new Date();
  mostRecentMondayDate.setDate(
    currentDate.getDate() - (currentDay - 1) + 7 * offset
  );
  console.log(" MOST RECENT MONDAY", mostRecentMondayDate);
  const match = mostRecentMondayDate
    .toISOString()
    .match(/^(?<year>[0-9]+)-(?<month>[0-9]+)-(?<day>[0-9]+)/);
  console.log(match);
  if (!match?.groups) {
    return "";
  } else {
    const groups = match.groups;
    const year = groups.year;
    const month = groups.month;
    const day = groups.day;
    return `${day}-${month}-${year}`;
  }
};

export const getStreakDate = () => {
  const date = moment();
  date.subtract(1, "day");
  return date.format("DD-MM-YYYY");
};
