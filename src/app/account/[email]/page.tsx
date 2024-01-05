import { cookies } from "next/headers";
import Link from "next/link";

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
      <div className=" flex gap-2">
        <SignOut />
        {!!data.userInfo && !!data.userInfo.is_admin && (
          <Link
            href={"/admin"}
            className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            admin account
          </Link>
        )}
      </div>
    </Container>
  );
}
