import getUserIdByEmail from "./getUserIdByEmail";
import { Connection } from "mysql2/promise";

export default async function getEmailIsTaken(
  databaseConnection: Connection,
  email: string,
) {
  const userId = await getUserIdByEmail(databaseConnection, email);
  return userId;
}
