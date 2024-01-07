//* protects route and sub routes
import { cookies, headers } from "next/headers";

import { ReactNode } from "react";

import Container from "@/components/general/Container";

import AdminPage from "./AdminPage";
import jwt from "jsonwebtoken";

export default async function adminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  const authorization = cookieStore.get("authorization");
  if (!authorization) return <Container>you're not logged in g</Container>;

  //verify token
  const verifiedToken = jwt.verify(
    authorization.value,
    process.env.JWT_SECRET_KEY!,
  );
  //if token is invalid
  if (typeof verifiedToken === "string" || verifiedToken instanceof String)
    return <Container>token is invalid</Container>;

  const response = await fetch(
    `${process.env.HOST}/api/user/${verifiedToken.userId}`,
    {
      method: "get",
      headers: {
        authorization: String(authorization?.value),
      },
    },
  );
  const data = await response.json();
  if (!data.userInfo.isAdmin)
    return <Container>you're not an admin g</Container>;

  return <>{children}</>;
}
