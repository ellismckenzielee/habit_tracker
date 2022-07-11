import moment from "moment";
export const getMonday = (offset: number = 0) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  console.log(currentDay - 1);
  let mostRecentMondayDate = new Date();
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

export const getDatesForWeek = (currentDate: string) => {
  console.log("getDatesForWeek called with: ", currentDate);
  const dates = [];
  const date = moment(currentDate, "DD-MM-YYYY");
  dates.push(date.format("DD-MM-YYYY"));
  for (let i = 1; i < 7; i++) {
    dates.push(date.add(1, "day").format("DD-MM-YYYY"));
  }
  return dates;
};

export const getStreakDate = () => {
  return "12-12-1993";
};
