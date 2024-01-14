import { cookies } from "next/headers";

import { ReactNode } from "react";

import Container from "@/components/general/Container";

import AdminNavigation from "./AdminNavigation";
import { jwtVerify } from "jose";

export default async function adminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = cookies();
  const authorization = cookieStore.get("authorization");
  if (!authorization) return <Container>you're not logged in g</Container>;

  let verifiedToken;
  try {
    const { payload } = await jwtVerify(
      authorization.value,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY),
    );
    verifiedToken = payload;
  } catch (error) {
    // Handle the error appropriately - token verification failed
    return <Container>token is invalid</Container>;
  }

  // If token is invalid or doesn't have the required claims
  if (!verifiedToken || typeof verifiedToken.userId !== "number") {
    return <Container>token is invalid</Container>;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user/${verifiedToken.userId}`,
    {
      method: "GET",
      headers: {
        Authorization: authorization.value,
      },
    },
  );
  const data = await response.json();
  if (!data.userInfo.isAdmin) {
    return <Container>you're not an admin g</Container>;
  }

  return <AdminNavigation>{children}</AdminNavigation>;
}
