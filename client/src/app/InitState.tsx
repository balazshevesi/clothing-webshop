"use client";

import { ReactNode, useEffect } from "react";

import getCookie from "@/utils/getCookie";
import isBrowser from "@/utils/isBrowser";

import { useAuthSlice } from "@/state/useAuthSlice";
import { useFavsSlice } from "@/state/useFavsSlice";
import { useShoppingCartSlice } from "@/state/useShoppingCartSlice";

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
  const fetchAndSetCart = useShoppingCartSlice(
    (state: any) => state.fetchAndSetCart,
  ) as any;
  const fetchAndSetFavs = useFavsSlice(
    (state: any) => state.fetchAndSetFavs,
  ) as any;

  useEffect(() => {
    const asyncStuffs = async () => {
      const userInfo = getCookie("userInfo");
      if (userInfo) setLoggedinTrue();

      const guestUserId = getCookie("guestUserId");
      if (!guestUserId) await getAndsetGuestId();
      fetchAndSetFavs();
      fetchAndSetCart();
    };
    asyncStuffs();
    // updateLoggedInAt();
  }, []);

  return children;
}
