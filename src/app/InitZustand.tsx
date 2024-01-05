"use client";

import { ReactNode } from "react";

import getCookie from "@/utils/getCookie";

import { useAuthSlice } from "@/state/useAuthSlice";

export default function InitZustand({ children }: { children: ReactNode }) {
  const setLoggedinTrue = useAuthSlice(
    (state: any) => state.setLoggedinTrue,
  ) as any;

  const userInfo = getCookie("UserInfo");

  if (userInfo) setLoggedinTrue();

  return <>{children}</>;
}
