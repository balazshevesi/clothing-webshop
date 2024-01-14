"use client";

import { ReactNode, useEffect } from "react";

import getCookie from "@/utils/getCookie";
import isBrowser from "@/utils/isBrowser";

import { useAuthSlice } from "@/state/useAuthSlice";

const getAndsetGuestId = async () => {
  const response = await fetch(`api/auth/create-guest`);
  const data = await response.json();
  const guestUserId = data.guestUserId;
  const guestUserAuth = data.guestUserAuth;
  document.cookie = `guestUserId=${guestUserId}`;
  document.cookie = `guestUserAuth=${guestUserAuth}`;
};

// const updateLoggedInAt = async () => {
//   if (getCookie("authorization"))
//     await fetch(`/api/loglogin/user/${JSON.parse(getCookie("userInfo")!).id}`, {
//       headers: {
//         authorization: getCookie("authorization")!,
//       },
//     });
//   if (getCookie("guestUserId"))
//     await fetch(`/api/loglogin/guest/${getCookie("guestUserId")}`, {
//       headers: {
//         guestUserAuth: getCookie("guestUserAuth")!,
//       },
//     });
// };

export default function InitState({ children }: { children: ReactNode }) {
  const setLoggedinTrue = useAuthSlice(
    (state: any) => state.setLoggedinTrue,
  ) as any;

  useEffect(() => {
    const userInfo = getCookie("userInfo");
    if (userInfo) setLoggedinTrue();
    const guestUserId = getCookie("guestUserId");
    if (!guestUserId) getAndsetGuestId();

    // updateLoggedInAt();
  }, []);

  return children;
}
