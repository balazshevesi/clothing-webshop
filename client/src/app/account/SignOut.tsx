"use client";

import { useRouter } from "next/navigation";

import deleteCookie from "@/utils/deleteCookie";

import { Button } from "@/components/ui/button";

import { useAuthSlice } from "@/state/useAuthSlice";
import { useFavsSlice } from "@/state/useFavsSlice";
import { useShoppingCartSlice } from "@/state/useShoppingCartSlice";

export default function SignOut() {
  const router = useRouter();
  const setLogedginFalse = useAuthSlice(
    (state: any) => state.setLogedginFalse,
  ) as any;

  const fetchAndSetCart = useShoppingCartSlice(
    (state: any) => state.fetchAndSetCart,
  ) as any;

  const fetchAndSetFavs = useFavsSlice(
    (state: any) => state.fetchAndSetFavs,
  ) as any;
  const resetFavs = useFavsSlice((state: any) => state.fetchAndSetFavs) as any;

  const resetCart = useShoppingCartSlice(
    (state: any) => state.resetCart,
  ) as any;

  const handleSignout = () => {
    setLogedginFalse();
    deleteCookie("userInfo");
    deleteCookie("userAuth");
    resetCart();
    resetFavs();
    fetchAndSetFavs();
    fetchAndSetCart();
    router.push("/");
  };

  return <Button onClick={handleSignout}>Signout</Button>;
}
