import Container from "@/components/general/Container";
import Title1 from "@/components/general/Title1";
import { cookies } from "next/headers";

export default async function AdminPage() {
  const cookieStore = cookies();
  const authorization = cookieStore.get("authorization");
  const userInfoCookies = cookieStore.get("userInfo");
  const userInfo = JSON.parse(userInfoCookies?.value!);

  return (
    <Container>
      <Title1>AdminPage</Title1>
    </Container>
  );
}
