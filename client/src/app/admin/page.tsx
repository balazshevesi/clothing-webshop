import { cookies } from "next/headers";
import Link from "next/link";

import Container from "@/components/general/Container";
import Title1 from "@/components/general/Title1";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const cookieStore = cookies();
  const userAuth = cookieStore.get("userAuth");
  const userInfoCookies = cookieStore.get("userInfo");
  const userInfo = JSON.parse(userInfoCookies?.value!);

  return <Title1>Welcome back {userInfo.firstName}</Title1>;
}
