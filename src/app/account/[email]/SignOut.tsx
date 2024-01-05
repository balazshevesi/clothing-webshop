"use client";

import { useRouter } from "next/navigation";

import deleteCookie from "@/utils/deleteCookie";
import getCookie from "@/utils/getCookie";

import { Button } from "@/components/ui/button";

import { useAuthSlice } from "@/state/useAuthSlice";

export default function SignOut() {
  const router = useRouter();
  const setLoggedinTrue = useAuthSlice(
    (state: any) => state.setLoggedinTrue,
  ) as any;

  const setLogedginFalse = useAuthSlice(
    (state: any) => state.setLogedginFalse,
  ) as any;

  const handleSignout = () => {
    setLogedginFalse();
    deleteCookie("UserInfo");
    deleteCookie("Authorization");
    router.push("/");
  };

  return <Button onClick={handleSignout}>Signout</Button>;
}
