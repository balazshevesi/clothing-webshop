"use client";

import { useRouter } from "next/navigation";

import deleteCookie from "@/utils/deleteCookie";

import { Button } from "@/components/ui/button";

import { useAuthSlice } from "@/state/useAuthSlice";

export default function SignOut() {
  const router = useRouter();
  const setLogedginFalse = useAuthSlice(
    (state: any) => state.setLogedginFalse,
  ) as any;

  const handleSignout = () => {
    setLogedginFalse();
    deleteCookie("userInfo");
    deleteCookie("authorization");
    router.push("/");
  };

  return <Button onClick={handleSignout}>Signout</Button>;
}
