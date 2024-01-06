"use client";

import { ReactNode } from "react";

import getCookie from "@/utils/getCookie";

import { useAuthSlice } from "@/state/useAuthSlice";

const getAndsetGuestId = async () => {
  const response = await fetch(`api/auth/createGuest`);
  const data = await response.json();
  const guestUserId = data.guestUserId;
  document.cookie = `guestUserId=${guestUserId}`;
};

export default function InitState({ children }: { children: ReactNode }) {
  const setLoggedinTrue = useAuthSlice(
    (state: any) => state.setLoggedinTrue,
  ) as any;

  const userInfo = getCookie("UserInfo");
  if (userInfo) setLoggedinTrue();

  // const cookieStore = cookies();
  const guestUserId = getCookie("guestUserId");
  if (!guestUserId) getAndsetGuestId();

  return children;
}
