import { Connection } from "mysql2/promise";

export default async function getUserInfoById(
  databaseConnection: Connection,
  userId: string,
) {
  const query = "CALL get_user_info_by_id(?)";
  const [rows] = await databaseConnection.execute(query, [userId]);
  return rows[0][0];
}
