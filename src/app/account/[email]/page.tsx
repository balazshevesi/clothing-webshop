import { cookies } from "next/headers";

import Container from "@/components/general/Container";
import Title1 from "@/components/general/Title1";
import { Button } from "@/components/ui/button";

import SignOut from "./SignOut";

export default async function Page({
  params,
}: {
  params: { ["email"]: string; action: string };
}) {
  const email = params.email;
  const cookieStore = cookies();
  const authorization = cookieStore.get("Authorization");

  const response = await fetch(`${process.env.HOST}/api/user/${email}`, {
    method: "get",
    headers: {
      Authorization: String(authorization?.value),
    },
  });
  const data = await response.json();

  return (
    <Container>
      <Title1>Viewing Account</Title1>
      {JSON.stringify(data)}
      <SignOut />
    </Container>
  );
}
