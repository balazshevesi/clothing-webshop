// Format the current date to MySQL datetime format
const getTimeStamp = () =>
  new Date()
    .toISOString()
    .replace(/T/, " ") // replace T with a space
    .replace(/\..+/, ""); // delete the dot and everything after

export default getTimeStamp;
