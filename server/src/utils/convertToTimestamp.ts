// Format the current date to MySQL datetime format
const convertToTimestamp = (date: Date) =>
  new Date(date)
    .toISOString()
    .replace(/T/, " ") // replace T with a space
    .replace(/\..+/, ""); // delete the dot and everything after

export default convertToTimestamp;
