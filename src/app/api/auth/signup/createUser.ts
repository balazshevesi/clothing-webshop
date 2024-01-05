import { Connection } from "mysql2/promise";

export default async function createUser(
  databaseConnection: Connection,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  hashedPassword: string,
) {
  const query = "CALL create_user(?, ?, ?, ?, ?)";
  const params = [firstName, lastName, phone, email, hashedPassword];
  await databaseConnection.query(query, params);
}
