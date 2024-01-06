import { Connection } from "mysql2/promise";

export default async function createGuest(databaseConnection: Connection) {
  await databaseConnection.query("CALL create_guest_user(@out_id);");
  const [rows, fields] = await databaseConnection.query("SELECT @out_id;");
  return rows[0]["@out_id"]
}
