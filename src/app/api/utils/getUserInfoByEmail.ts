import { Connection } from "mysql2/promise";

export default async function getUserInfoByEmail(
  databaseConnection: Connection,
  email: string,
) {
  const query = "CALL get_user_info_by_email(?)";
  const params = [email];

  const [rows] = await databaseConnection.query(query, params);

  try {
    return rows[0][0];
  } catch {
    return null;
  }
}
