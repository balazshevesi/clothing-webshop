"use client";

import { ReactNode, useEffect } from "react";

import getCookie from "@/utils/getCookie";
import isBrowser from "@/utils/isBrowser";

import { useAuthSlice } from "@/state/useAuthSlice";
import { useShoppingCartSlice as shoppingCartSlice } from "@/state/useShoppingCartSlice";

const getAndsetGuestId = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/create-guest`,
  );
  const data = await response.json();
  const guestUserId = data.guestUserId;
  const guestUserAuth = data.guestUserAuth;
  document.cookie = `guestUserId=${guestUserId}`;
  document.cookie = `guestUserAuth=${guestUserAuth}`;
  return data;
};

export default function InitState({ children }: { children: ReactNode }) {
  const setLoggedinTrue = useAuthSlice(
    (state: any) => state.setLoggedinTrue,
  ) as any;
  const fetchAndSetCart = shoppingCartSlice(
    (state: any) => state.fetchAndSetCart,
  ) as any;

  useEffect(() => {
    const asyncStuffs = async () => {
      const userInfo = getCookie("userInfo");
      if (userInfo) setLoggedinTrue();

      const guestUserId = getCookie("guestUserId");
      if (!guestUserId) await getAndsetGuestId();
      fetchAndSetCart();
    };
    asyncStuffs();
    // updateLoggedInAt();
  }, []);

  return children;
}
