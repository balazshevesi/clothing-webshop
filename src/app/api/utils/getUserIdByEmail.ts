import { Connection } from "mysql2/promise";

export default async function getUserIdByEmail(
  databaseConnection: Connection,
  email: string,
) {
  const query = "CALL get_user_id_from_email(?)";
  const params = [email];

  const [rows] = await databaseConnection.query(query, params);

  try {
    return rows[0][0].id;
  } catch {
    return null;
  }
}
