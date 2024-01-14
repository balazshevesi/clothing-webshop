import { cookies } from "next/headers";
import Link from "next/link";

import Container from "@/components/general/Container";
import Title1 from "@/components/general/Title1";

import SignOut from "./SignOut";

export default async function Page() {
  const cookieStore = cookies();
  const userAuth = cookieStore.get("userAuth");
  const userInfoCookies = cookieStore.get("userInfo");
  const userInfo = JSON.parse(userInfoCookies?.value!);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/${userInfo.id}`,
    {
      method: "get",
      headers: {
        userAuth: String(userAuth?.value),
      },
    },
  );
  const data = await response.json();

  return (
    <Container>
      <Title1>Viewing Account</Title1>
      {JSON.stringify(data)}
      <div className=" flex gap-2">
        <SignOut />
        {!!data.userInfo && !!data.userInfo.isAdmin && (
          <Link
            href={"/admin"}
            className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            View Admin Panel
          </Link>
        )}
      </div>
    </Container>
  );
}
