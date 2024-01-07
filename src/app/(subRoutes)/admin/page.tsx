import { cookies } from "next/headers";

import Container from "@/components/general/Container";
import Title1 from "@/components/general/Title1";

export default async function Page() {
  const cookieStore = cookies();
  const authorization = cookieStore.get("authorization");
  const userInfoCookies = cookieStore.get("userInfo");
  const userInfo = JSON.parse(userInfoCookies?.value!);

  return (
    <div className="flex h-full items-stretch">
      <div className=" h-full w-24 bg-pink-600">
        <div className=" sticky top-20">navigation</div>
      </div>
      <Title1>Welcome back {userInfo.firstName}</Title1>
    </div>
  );
}
