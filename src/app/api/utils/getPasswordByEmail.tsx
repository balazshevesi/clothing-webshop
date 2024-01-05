import { Connection } from "mysql2/promise";

export default async function getPasswordByEmail(
  databaseConnection: Connection,
  email: string,
) {
  const query = "CALL get_user_password(?)";
  const params = [email];

  const [rows] = await databaseConnection.query(query, params);

  try {
    return rows[0][0].password;
  } catch {
    return null;
  }
}
